import { logger } from "../common/logger";
import { dataProvider } from "./dataProvider";
import { Editor } from "./Editor";
import { parser } from "./parser";

const editor = new Editor();
editor.setListener((_, lex) => {
    window.postMessage({
        evt: "lexemChanged",
        lexem: parser.parseLexem(lex) == null ? "" : lex
    });
});

//var port = chrome.runtime.connect();
window.addEventListener("message", (event) => {
    if (event.source !== window) {
        return;
    }

    if (event.data.evt == "cmd" && event.data.command) {
        switch (event.data.command) {
            case "schema":
                const lex = editor.getSelectedLexem();
                const operation = parser.parseLexem(lex);
                if (operation == null)
                    logger.error(`'${lex}' is not a Dune table`);
                else {
                    dataProvider.getData(operation)
                        .then((data) => logger.log(data))
                        .catch((err) => logger.error(err));
                }
                break;
            default:
                logger.error(`command ${event.data.command} is not supported`);
        }
    }
}, false);
