import { CommandToolbar } from "./CommandToolbar";

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
toolbar.addCommand("Schema", "schema")
toolbar.addCommand("Data", "sampleData")
toolbar.initAndAttachButtons()
