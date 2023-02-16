class FindOperation {
    namespace = "";
    blockchain: string = "";
}

class FindTableDetail extends FindOperation {
    category: string = "";
    tableName: string = "";
}

class FindDecodedTableDetail extends FindOperation {
    contractName: string = "";
    abi: string = "";
    memberType = "";
}

export { FindTableDetail, FindDecodedTableDetail }

