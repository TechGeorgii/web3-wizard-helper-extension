# Chrome Extension Boilerplate with React, TypeScript and Webpack

<p>
<img src="https://img.shields.io/badge/version-1.0.0-orange.svg?cacheSeconds=2592000" />
  <a href="https://github.com/harshal-limaye/chrome-extension-boilerplate-react-typescript#readme">
    <img alt="documented" src="https://img.shields.io/badge/vocumented-yes-blue.svg" target="_blank" />
  </a>
  <a href="https://github.com/harshal-limaye/chrome-extension-boilerplate-react-typescript/graphs/commit-activity">
    <img alt="Updated" src="https://img.shields.io/badge/updated-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/harshal-limaye/chrome-extension-boilerplate-react-typescript/LICENSE">
    <img alt="license: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>
This repository aims to provide a simple and lightweight boilerplate project for writing chrome extensions using React and TypeScript.

## 🔥 Features

- **React 18**
- **Webpack 5**
- **TypeScript**
- **Manifest V3**

## 💾 Installation

Clone the repository using following command in the terminal:

```
git clone https://github.com/harshal-limaye/chrome-extension-boilerplate-react-typescript.git <PROJECT_NAME>
```

Next, navigate to the newly cloned repository directory and run following command to install the dependencies

```
npm install
```

## 💻 Usage

Use following command to run webpack in watch mode. It'll automatically reload the build if any changes are made to the files. It also generates source maps to aid the development process.

```
npm start
```

Use following command to create a production ready build.

```
npm run build
```

## 🔌Loading extension in Chrome

To load the extension in chrome

1. Navigate to `chrome://extensions/`
2. Turn on **Developer Mode** using option located on top right hand side corner of page.
3. Click on **Load unpacked** button. This will open file browser.
4. Select the **dist** folder from the cloned repository.

And that's it! Happy coding...😎

## ✏️ Resources

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Typescript documentation](https://www.typescriptlang.org/docs/)
- [Chrome Extension documentation](https://developer.chrome.com/docs/extensions/mv3/)
- [Webpack documentation](https://webpack.js.org/concepts/)
