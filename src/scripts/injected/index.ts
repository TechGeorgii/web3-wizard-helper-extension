import { executeGraphQl } from "./backend";
import { schemaCommand } from "./commands";
import { logger } from "../common/logger";
import { Editor } from "./Editor";

const editor = new Editor();

//var port = chrome.runtime.connect();
window.addEventListener("message", (event) => {
    if (event.source !== window) {
        return;
    }

    if (event.data.evt == "cmd" && event.data.command) {
        alert(event.data.command);
        switch (event.data.command) {
            case "schema":
                schemaCommand(editor);
                break;
            default:
                logger.error(`command ${event.data.command} is not supported`);
        }
    }
}, false);

