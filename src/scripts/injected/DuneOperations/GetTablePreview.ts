import { TableOperation } from "./TableOperation";
import { ExecutionId } from "./ExecutionId";

class GetTablePreview extends TableOperation {
    operationName = "GetTablePreview";

    constructor(lexem: string) {
        super(lexem, true);
    }

    serialize(): string {
        return JSON.stringify({
            operationName: this.operationName,
            variables: {
                table: this.lexem
            },
            query: "mutation GetTablePreview($table: String!) {\n get_table_preview(table: $table) {\n job_id\n result_id\n error_id\n query_id\n parameters {\n key\n type\n value\n __typename\n }\n __typename\n }\n}\n"
        });
    }

    override getExecutionId(data: any): ExecutionId {
        if (data.data && data.data.get_table_preview) {
            const tp = data.data.get_table_preview;
            const res = new ExecutionId();
            res.executionId = tp.job_id ?? tp.result_id;
            res.queryId = tp.query_id;
            res.parameters = tp.parameters;
            return res;
        }

        throw "cannot create execution id";
    }
}

export { GetTablePreview }
