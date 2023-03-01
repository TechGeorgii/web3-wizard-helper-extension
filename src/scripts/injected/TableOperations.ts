class ExecutionId {
    executionId = "";
    queryId = 0;
    parameters: any[] = [];
}

abstract class TableOperation {
    lexem: string;
    namespace = "";
    blockchain = "";
    operationName = "";
    private _longOperation: boolean;

    abstract serialize(): string;

    get longOperation(): boolean {
        return this._longOperation;
    }

    getExecutionId(_: any): ExecutionId {
        throw "needs to be overriden";
    }

    constructor(lexem: string, longOperation = false) {
        this.lexem = lexem;
        this._longOperation = longOperation;
    }
}

class FindTableDetail extends TableOperation {
    operationName = "FindTableDetail"
    category = "";
    tableName = "";

    serialize(): string {
        return JSON.stringify({
            operationName: this.operationName,
            variables: {
                category: this.category,
                namespace: this.namespace,
                table_name: this.tableName,
                blockchains_filter: this.blockchain ? { _eq: [this.blockchain] } : {},
                dataset_id: 11
            },
            query: "query FindTableDetail($category: String!, $namespace: String!, $table_name: String!, $blockchains_filter: jsonb_comparison_exp!, $dataset_id: Int!) {\n  arrakis_schemas(\n    where: {category: {_eq: $category}, table_name: {_eq: $table_name}, namespace: {_eq: $namespace}, blockchains: $blockchains_filter, dataset_id: {_eq: $dataset_id}}\n  ) {\n    id\n    column_name\n    data_type\n    full_name\n    blockchains\n    __typename\n  }\n}\n"
        });
    }
}

class FindDecodedTableDetail extends TableOperation {
    operationName = "FindDecodedTableDetail"
    contractName = "";
    abi = "";
    memberType = "";

    serialize(): string {
        return JSON.stringify({
            operationName: this.operationName,
            variables: {
                namespace: this.namespace,
                contract_name: this.contractName,
                abi: this.abi,
                blockchains_filter: {
                    _eq: [this.blockchain]
                },
                dataset_id: 11
            },
            query: "query FindDecodedTableDetail($namespace: String!, $contract_name: String!, $abi: String!, $blockchains_filter: jsonb_comparison_exp!, $dataset_id: Int!) {\n  arrakis_schemas(\n    where: {category: {_eq: \"decoded_project\"}, namespace: {_eq: $namespace}, contract_name: {_eq: $contract_name}, abi_name: {_eq: $abi}, blockchains: $blockchains_filter, dataset_id: {_eq: $dataset_id}}\n  ) {\n    id\n    abi_type\n    table_name\n    column_name\n    data_type\n    full_name\n    blockchains\n    __typename\n  }\n}\n"
        });

    }
}

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

class GetExecution {
    private id: ExecutionId;

    constructor(id: ExecutionId) {
        this.id = id;
    }

    serialize(): string {
        return JSON.stringify({
            operationName: "GetExecution",
            variables: {
                execution_id: this.id.executionId,
                query_id: this.id.queryId,
                parameters: this.id.parameters
            },
            "query": "query GetExecution($execution_id: String!, $query_id: Int!, $parameters: [Parameter!]!) {\n get_execution(\n execution_id: $execution_id\n query_id: $query_id\n parameters: $parameters\n ) {\n execution_queued {\n execution_id\n execution_user_id\n position\n execution_type\n created_at\n __typename\n }\n execution_running {\n execution_id\n execution_user_id\n execution_type\n started_at\n created_at\n __typename\n }\n execution_succeeded {\n execution_id\n runtime_seconds\n generated_at\n columns\n data\n __typename\n }\n execution_failed {\n execution_id\n type\n message\n metadata {\n line\n column\n hint\n __typename\n }\n runtime_seconds\n generated_at\n __typename\n }\n __typename\n }\n}\n"
        });
    }
}

export { FindTableDetail, FindDecodedTableDetail, TableOperation, GetTablePreview, ExecutionId, GetExecution };
