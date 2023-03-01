class DuneTablePreview {
    tableName: string;
    columns: string[];
    private _length: number;
    data: any;

    constructor(tableName: string, jsonData: any) {
        this.tableName = tableName;
        this.columns = jsonData.columns as string[];
        this._length = jsonData.data.length;
        this.data = jsonData.data;
    }

    // getValue(row: number, col: string): any {
    //     if (row < 0 || row >= this.length)
    //         throw "out of bounds";
    //     return this._data[row][col];
    // }

    get length() { return this._length; }
}

export { DuneTablePreview };
