import App from "./components/App";
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

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);

const root = ReactDOM.createRoot(appRoot);
const app = <App />;

root.render(app);
