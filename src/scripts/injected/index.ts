import { logger } from "../common/logger";
import { dataProvider } from "./dataProvider";
import { Editor } from "./Editor";
import { parser } from "./parser";
import { GetTablePreview } from "./DuneOperations/GetTablePreview"
import { ListThirdParties } from "./DuneOperations/ListThirdParties";

const editor = new Editor();
editor.setListener((_, lex) => {
    window.postMessage({
        evt: "lexemChanged",
        lexem: parser.parseLexem(lex) == null ? "" : lex
    });
});

dataProvider.getData(new ListThirdParties())
    .then(res => {
        if (res.data && res.data.arrakis_schemas) {
            logger.log("third_party_data category namespaces received");
            parser.setNamespacesCategory(res.data.arrakis_schemas.map((el: any) => el.namespace), "third_party_data");
        }
        else
            logger.error("cannot set third_party_data category namespaces: no data returned");
    })
    .catch(err => logger.error("cannot set third_party_data category namespaces: " + err));
;

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
                    .catch((err) => {
                        window.postMessage({
                            evt: "schemaReceived",
                            error: err,
                            tableName: lex
                        });;
                    });

                break;

            case "preview":
                const sendPreviewReceived = (tableName: string, data: any = null, loading = false, error = "") => {
                    window.postMessage({
                        evt: "previewReceived",
                        tableName: tableName,
                        rawData: data,
                        error: error,
                        loading: loading
                    });
                };

                sendPreviewReceived(lex, null, true);

                const tablePreviewOperation = new GetTablePreview(lex);

                dataProvider.getData(tablePreviewOperation)
                    .then((data) => {
                        logger.log(data);
                        sendPreviewReceived(lex, data);
                    })
                    .catch((err) => {
                        logger.error(err);
                        sendPreviewReceived(lex, null, false, err);
                    });

                break;

            default:
                logger.error(`command ${event.data.command} is not supported`);
        }
    }
}, false);

