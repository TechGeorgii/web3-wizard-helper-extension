import { ExecutionId } from "./ExecutionId";

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

export { GetExecution };
