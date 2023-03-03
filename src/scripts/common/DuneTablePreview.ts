class DuneTablePreview {
    tableName: string;
    columns: string[] | null = null;
    data: any | " null" = null;
    error: boolean;

    constructor(tableName: string, jsonData: any, error: boolean = false) {
        this.tableName = tableName;
        this.error = error;

        if (jsonData) {
            this.columns = jsonData.columns as string[];
            this.data = jsonData.data;
        }
    }
}
export { DuneTablePreview };
