import { TableOperation } from "./TableOperation";

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


export { FindDecodedTableDetail };
