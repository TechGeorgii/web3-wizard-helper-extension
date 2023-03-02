class DuneTablePreview {
    tableName: string;
    columns: string[];
    data: any;

    constructor(tableName: string, jsonData: any) {
        this.tableName = tableName;
        this.columns = jsonData.columns as string[];
        this.data = jsonData.data;
    }
}

export { DuneTablePreview };
