import { logger } from "../common/logger";
import { parser } from "./parser";

class Editor {
    private ace: any;

    constructor() {
        this.init();
    }

    getSelectedLexem(): string {
        let pos = this.ace.getCursorPosition();
        let line = this.ace.session.getLine(pos.row);
        let lexem = parser.findLexem(line, pos.column);

        return lexem;
    }

    private init() {
        if ((window as any).ace != null && document.querySelector("#code")) {
            logger.log("editor found");
            this.ace = ((window as any).ace as any).edit("code");

            this.ace.session.selection.on('change', () => {
                this.emitLexemChangedEvt();
            });

            this.ace.session.selection.on('changeSelection', () => {
                this.emitLexemChangedEvt();
            });

            this.ace.session.selection.on('changeCursor', () => {
                this.emitLexemChangedEvt();
            });
        }
        else {
            logger.log("editor not found. Retrying in 1 second.");
            setTimeout(() => this.init(), 1000);
        }
    }

    private emitLexemChangedEvt() {
        window.postMessage({
            evt: "lexemChanged",
            lexem: this.getSelectedLexem()
        });
    }
}

// executeGraphQl("{\"operationName\":\"FindDecodedTableDetail\",\"variables\":{\"namespace\":\"uniswap_v3\",\"contract_name\":\"Pair\",\"abi\":\"Flash\",\"blockchains_filter\":{\"_eq\":[\"ethereum\"]},\"dataset_id\":11},\"query\":\"query FindDecodedTableDetail($namespace: String!, $contract_name: String!, $abi: String!, $blockchains_filter: jsonb_comparison_exp!, $dataset_id: Int!) {\\n  arrakis_schemas(\\n    where: {category: {_eq: \\\"decoded_project\\\"}, namespace: {_eq: $namespace}, contract_name: {_eq: $contract_name}, abi_name: {_eq: $abi}, blockchains: $blockchains_filter, dataset_id: {_eq: $dataset_id}}\\n  ) {\\n    id\\n    abi_type\\n    table_name\\n    column_name\\n    data_type\\n    full_name\\n    blockchains\\n    __typename\\n  }\\n}\\n\"}")
//     .then(data => console.log(data));

export { Editor }
