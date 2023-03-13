interface DuneTableColumn {
    id: string | undefined;
    column_name: string | undefined;
    data_type: string | undefined;
    full_name: string | undefined;
}


class DuneTableSchema {
    tableName: string;
    columns: DuneTableColumn[] | null = null;
    error: string;

    constructor(tableName: string, jsonData: any, error = "") {
        this.tableName = tableName;
        this.error = error;

        if (jsonData && jsonData.data && jsonData.data.arrakis_schemas)
            this.columns = (jsonData.data.arrakis_schemas as DuneTableColumn[])
                .map(obj => obj)
                // full_name is the same as table name. Sometimes for tables like "tokens.erc20" some columns come
                // from different tables. So we need to leave only cols related to current table.
                .filter(col => (typeof col.full_name == "string" ? col.full_name.toLowerCase() : "") == tableName.toLowerCase());
    }
}

export { DuneTableSchema, DuneTableColumn };
