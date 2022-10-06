import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Options from './options';

const appRoot = document.createElement('div');

document.body.appendChild(appRoot);

const root = ReactDOM.createRoot(appRoot);

root.render(<Options />);
