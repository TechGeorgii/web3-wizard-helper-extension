import { ExecutionId } from "./ExecutionId";

abstract class TableOperation {
    lexem: string;
    namespace = "";
    blockchain = "";
    operationName = "";
    private _longOperation: boolean;

    abstract serialize(): string;

    get longOperation(): boolean {
        return this._longOperation;
    }

    getExecutionId(_: any): ExecutionId {
        throw "needs to be overriden";
    }

    constructor(lexem: string, longOperation = false) {
        this.lexem = lexem;
        this._longOperation = longOperation;
    }
}

export { TableOperation }
