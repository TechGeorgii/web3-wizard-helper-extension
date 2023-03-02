import App from "./components/App";
import React from 'react';
import * as ReactDOM from 'react-dom/client';

function initExtension() {
    // Relay logs from injected page to background page.
    window.addEventListener("message", (event: any) => {
        if (event.source !== window)
            return;

        if (event.data && event.data.evt == "backgroundLog") {
            chrome.runtime.sendMessage({ type: "backgroundLog", message: event.data.message });
        }
    });

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

    const appRoot = document.createElement('div');
    document.body.appendChild(appRoot);
    const root = ReactDOM.createRoot(appRoot);
    const app = <App />;
    root.render(app);
}

chrome.storage.local.get(["extEnabled"]).
    then((result) => {
        if (result.extEnabled ?? true) {
            initExtension();
        }
    }).catch((err) => {
        console.error("error checking extEnabled: " + err);
    });
