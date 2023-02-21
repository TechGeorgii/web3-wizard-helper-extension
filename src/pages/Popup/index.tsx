import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Popup from './popup';

const popupCss = document.createElement("link");
popupCss.href = "./popup.css";
popupCss.rel = "stylesheet";
document.head.appendChild(popupCss);

const appRoot = document.createElement('div');
appRoot.className = "popupRootDiv";

document.body.appendChild(appRoot);

const root = ReactDOM.createRoot(appRoot);

root.render(<Popup />);
