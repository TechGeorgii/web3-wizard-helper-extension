interface DuneTableColumn {
    id: string | undefined;
    column_name: string | undefined;
    data_type: string | undefined;
}


class DuneTableSchema {
    tableName: string;
    columns: DuneTableColumn[];

    constructor(tableName: string, jsonData: any) {
        this.tableName = tableName;

        this.columns = (jsonData.data.arrakis_schemas as DuneTableColumn[]).map(obj => obj);
    }
}

export { DuneTableSchema, DuneTableColumn };
