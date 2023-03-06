import { logger } from "../common/logger";
import { dataProvider } from "./dataProvider";
import { Editor } from "./Editor";
import { parser } from "./parser";
import { GetTablePreview } from "./TableOperations"
import { DuneTablePreview } from "../common/DuneTablePreview";

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

    if (event.data.evt == "cmd" && ["schema", "preview"].includes(event.data.command)) {
        const lex = editor.getSelectedLexem();
        const operation = parser.parseLexem(lex);
        if (operation == null) {
            logger.error(`'${lex}' is not a Dune table`);
            return;
        }

        switch (event.data.command) {
            case "schema":
                dataProvider.getData(operation)
                    .then((data) => {
                        logger.log(data);

                        window.postMessage({
                            evt: "schemaReceived",
                            rawData: data,
                            tableName: lex
                        });
                    })
                    .catch((err) => logger.error(err));

                break;

            case "preview":
                const sendPreviewReceived = (tableName: string, data: any = null, error = false) => {
                    window.postMessage({
                        evt: "previewReceived",
                        tableName: tableName,
                        rawData: data,
                        error: !error ? null : error
                    });
                };

                sendPreviewReceived(lex);

                const tablePreviewOperation = new GetTablePreview(lex);

                dataProvider.getData(tablePreviewOperation)
                    .then((data) => {
                        logger.log(data);
                        sendPreviewReceived(lex, data);
                    })
                    .catch((err) => {
                        logger.error(err);
                        sendPreviewReceived(lex, null, true);
                    });

                break;

            default:
                logger.error(`command ${event.data.command} is not supported`);
        }
    }
}, false);

