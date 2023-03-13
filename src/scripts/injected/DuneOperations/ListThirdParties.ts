import { TableOperation } from "./TableOperation";

class ListThirdParties extends TableOperation {
    operationName = "ListThirdParties";
    category = "abstraction";

    constructor() {
        super("");
    }

    serialize(): string {
        return JSON.stringify({
            operationName: this.operationName,
            variables: {
                dataset_id: 11,
                search_terms: []
            },
            query: "query ListThirdParties($dataset_id: Int!, $search_terms: [arrakis_schemas_bool_exp!]!, $offset: Int) {\n arrakis_schemas(\n where: {category: {_eq: \"third_party_data\"}, dataset_id: {_eq: $dataset_id}, _and: $search_terms}\n order_by: [{namespace: asc}, {blockchains: asc}]\n distinct_on: [namespace, blockchains]\n limit: 50\n offset: $offset\n ) {\n id\n namespace\n blockchains\n __typename\n }\n}\n"
        }
        );
    }
}

export { ListThirdParties };
