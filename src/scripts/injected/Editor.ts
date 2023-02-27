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
            this.ace = ((window as any).ace as any).edit("code");

            this.ace.commands.addCommand({
                name: "schema",
                exec: () => {
                    window.postMessage({ evt: "cmd", command: "schema" });
                },
                bindKey: { win: "ctrl-s", mac: "cmd-s" }
            });

            this.ace.commands.addCommand({
                name: "preview",
                exec: () => {
                    window.postMessage({ evt: "cmd", command: "preview" });
                },
                bindKey: { win: "ctrl-p", mac: "cmd-p" }
            });

            this.ace.session.selection.on('change', () => {
                this.emitLexemChangedEvt();
            });

            this.ace.session.selection.on('changeSelection', () => {
                this.emitLexemChangedEvt();
            });

            this.ace.session.selection.on('changeCursor', () => {
                this.emitLexemChangedEvt();
            });

            logger.log("editor found and initialized");
            this.checkLost();
        }
        else {
            logger.log("editor not found. Retrying in 1 second.");
            setTimeout(() => this.init(), 1000);
        }
    }

    checkLost() {
        if ((window as any).ace != null && document.querySelector("#code")) {
            if (this.ace != null) {
                const newEditor = ((window as any).ace as any).edit("code");
                if (newEditor.id != this.ace.id) {
                    logger.info("editor was recreated. Rebounding.");
                    this.init();
                    return;
                }
            }
        } else {
            logger.log("editor lost. Trying to find it again");
        }

        setTimeout(() => this.checkLost(), 1000);
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
