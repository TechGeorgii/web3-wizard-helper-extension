import { CommandToolbar } from "./CommandToolbar";
import TableSchema from "./components/TableSchema";
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import DuneTable from "../common/DuneTable";

function injectScript() {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('injectedscript.js?');
    s.onload = () => {
        s.remove();
    };
    (document.head || document.documentElement).appendChild(s)
    s.parentNode!.removeChild(s)
}

injectScript();

const toolbar = new CommandToolbar();
toolbar.addCommand("Schema (ctrl-s)", "schema");
toolbar.addCommand("Preview (ctrl-p)", "preview");
toolbar.initAndAttachButtons();


window.addEventListener("message", (event) => {
    if (event.source !== window || event.data.evt !== "schemaReceived"
        || !event.data.rawData
        || !event.data.tableName) {
        return;
    }

    const duneTable = new DuneTable(event.data.tableName, event.data.rawData);

    const appRoot = document.createElement('div');
    document.body.appendChild(appRoot);

    const root = ReactDOM.createRoot(appRoot);
    const schema = <TableSchema table={duneTable} />;
    root.render(schema);
});
