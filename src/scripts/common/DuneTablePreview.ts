class DuneTablePreview {
    tableName: string;
    columns: string[] | null = null;
    data: any | " null" = null;
    error: string;
    loading: boolean;

    constructor(tableName: string, jsonData: any, error = "", loading = false) {
        this.tableName = tableName;
        this.error = error;
        this.loading = loading;

        if (jsonData) {
            this.columns = jsonData.columns as string[];
            this.data = jsonData.data;
        }
    }
}
export { DuneTablePreview };
