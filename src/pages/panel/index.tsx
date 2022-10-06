import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Panel from './panel';

const appRoot = document.createElement('div');

document.body.appendChild(appRoot);

const root = ReactDOM.createRoot(appRoot);

root.render(<Panel />);
