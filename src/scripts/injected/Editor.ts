import { logger } from "../common/logger";
import { parser } from "./parser";

type LexemChangedListenerType = ((editor: Editor, lexem: string) => void);

class Editor {
    private ace: any;
    private lexemChangedListener: null | LexemChangedListenerType = null;

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

    setListener(func: LexemChangedListenerType) {
        this.lexemChangedListener = func;
    }

    voidListener() {
        this.lexemChangedListener = null;
    }

    private emitLexemChangedEvt() {
        if (this.lexemChangedListener != null)
            this.lexemChangedListener(this, this.getSelectedLexem());
    }
}

export { Editor }
