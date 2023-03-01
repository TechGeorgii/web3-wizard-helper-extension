import { TableOperation, ExecutionId, GetExecution } from "./TableOperations";
import { logger } from "../common/logger";
import { executeGraphQl } from "./backend";
import { Mutex, MutexInterface } from 'async-mutex';

class DataProvider {
    private dataMap = new Map<string, any>();
    private activeOperations = new Set<string>();
    private mutex = new Mutex();

    async getData(operation: TableOperation): Promise<any> {
        const key = operation.operationName + "####" + operation.lexem;

        let release: MutexInterface.Releaser | null
        release = await this.mutex.acquire();
        try {
            const cached = this.dataMap.get(key);
            if (cached != null) {
                logger.info(`cache hit: ${key}`);
                return Promise.resolve(cached);
            }
            if (this.activeOperations.has(key))
                return Promise.reject("operation is in queue");

            this.activeOperations.add(key);

            logger.info(`cache miss: ${key}`);
        }
        finally {
            release();
        }

        release = null;
        let data: any = null;
        try {
            if (operation.longOperation) {
                logger.info(`Long operation. Getting operationId ${key}`);
                const resExec = await executeGraphQl(operation.serialize());
                const executionId = operation.getExecutionId(resExec);
                logger.info(`executionId received for ${key}`);

                const tries = 3;
                for (let i = 0; i < tries; i++) {
                    await this.wait(1000);
                    logger.info(`checking for completion ${key} (${i + 1}/${tries})`);
                    data = await this.getExecutionResult(executionId);
                    if (data != null)
                        break;
                }
                if (!data)
                    return Promise.reject("operation timed out or returned invalid data");

                logger.info(`long operation ${key} completed`);
            } else {
                logger.info(`getting data from backend ${key}`);
                data = await executeGraphQl(operation.serialize());
                logger.info(`getting data from backend ${key} completed`);
            }

            release = await this.mutex.acquire();
            this.dataMap.set(key, data);

            logger.info(`cache updated for ${key}`);
        }
        catch (err) {
            logger.error(`failed operation ${operation.operationName} for "${operation.lexem}": ${err}`);
        }
        finally {
            this.activeOperations.delete(key);
            if (release != null)
                release();
        }

        return data;
    }

    private async getExecutionResult(id: ExecutionId): Promise<any | null> {
        const exec = new GetExecution(id);
        const res = await executeGraphQl(exec.serialize(), true);

        return res.data && res.data.get_execution && res.data.get_execution && res.data.get_execution.execution_succeeded
            ? res.data.get_execution.execution_succeeded
            : null;
    }

    private wait(ms: number) {
        return new Promise(r => {
            setTimeout(() => r([]), ms);
        });
    }
}


const dataProvider = new DataProvider();
export { dataProvider }
