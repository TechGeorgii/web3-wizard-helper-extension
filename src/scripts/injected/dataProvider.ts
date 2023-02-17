import { FindOperation } from "./TableOperation";
import { logger } from "../common/logger";
import { executeGraphQl } from "./backend";
import { Mutex, MutexInterface } from 'async-mutex';

class DataProvider {
    private dataMap = new Map<string, any>();
    private mutex = new Mutex();

    async getData(operation: FindOperation): Promise<any> {
        const key = operation.operationName + "####" + operation.lexem;

        let release: MutexInterface.Releaser | null
        release = await this.mutex.acquire();
        try {
            const cached = this.dataMap.get(key);
            if (cached != null) {
                logger.info(`cache hit: ${key}`);
                return Promise.resolve(cached);
            }
            logger.info(`cache miss: ${key}`);
        }
        finally {
            release();
        }

        release = null;
        let data: any = null;
        try {
            logger.info(`getting data from backend ${key}`);
            data = await executeGraphQl(operation.serialize());
            logger.info(`getting data from backend ${key} completed`);

            release = await this.mutex.acquire();
            this.dataMap.set(key, data);

            logger.info(`cache updated for ${key}`);
        }
        catch (err) {
            logger.error(`cannot load schema for "${operation.lexem}": ${err}`);
        }
        finally {
            if (release != null)
                release();
        }

        return data;
    }
}

const dataProvider = new DataProvider();
export { dataProvider }
