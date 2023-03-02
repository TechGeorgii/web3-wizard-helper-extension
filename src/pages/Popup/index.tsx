import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Popup from './popup';

chrome.storage.local.get(["extEnabled"]).
    then((result) => {
        const extEnabled = result.extEnabled ?? true;

        const appRoot = document.createElement('div');
        appRoot.className = "popupRootDiv";
        document.body.appendChild(appRoot);

        const root = ReactDOM.createRoot(appRoot);
        root.render(<Popup extEnabled={extEnabled} />);
    }).catch((err) => {
        console.error("error checking extEnabled: " + err);
    });


