import { CommandToolbar } from "./CommandToolbar";
import TableSchema from "./TableSchema";
import React from 'react';
import * as ReactDOM from 'react-dom/client';

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

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);

const root = ReactDOM.createRoot(appRoot);
const schema = <TableSchema text='hello root' />;
root.render(schema);
