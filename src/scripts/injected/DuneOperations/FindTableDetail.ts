import { TableOperation } from "./TableOperation";

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
export { FindTableDetail };