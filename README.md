# Web3 Wizard Helper Extension for Dune Analytics

gm Web3 Data Wizards 🧙🧙🧙 

This extension is for you to speed up querying on [Dune Analytics](https://dune.com/).

It helps you to get Dune tables preview and structure in a second, WITHOUT:
- Navigating in the data explorer (left panel).
- Making mock selects (SELECT * FROM ... LIMIT 10) to see table structure.

How to use in Dune SQL editor:
- Put cursor on table name and press Ctrl-s to see Dune table's structure (click column name to copy).
- Put cursor on table name and press Ctrl-p to preview Dune table.
🥳🥳🥳

Additional tool:
- Get text Ethereum signatures by 4 byte Keccak256 binary signature.

<br/>

<img src="https://raw.githubusercontent.com/TechGeorgii/github-resources/main/Web3-Wizard-Helper-intro.gif"/>

## Installation

Clone the repository:

```
git clone https://github.com/TechGeorgii/web3-wizard-helper-extension.git <PROJECT_NAME>
```

Next, navigate to the newly cloned repository directory and run following command to install the dependencies

```
npm install
```

## Usage

Use following command to run webpack in watch mode. It'll automatically reload the build if any changes are made to the files. It also generates source maps to aid the development process.

```
npm start
```

Use following command to create a production ready build.

```
npm run build
```

To run Jest tests

```
npm run test
```

## Loading extension in Chrome

To load the extension into chrome

1. Navigate to `chrome://extensions/`
2. Turn on **Developer Mode** using option located on top right hand side corner of page.
3. Click on **Load unpacked** button. This will open file browser.
4. Select the **dist** folder from the cloned repository.

After you made changes:
1. Ensure new code was built.
2. Navigate to `chrome://extensions/`
3. Click 'Reload' for Web3 Wizard Helper.
4. Reload page with extension injected.

## Resources

- [Published Extension in Chrome Web Store](https://chrome.google.com/webstore/detail/web3-wizard-helper/aefehogbbakpjjegponcmdnkfjipdcfl)
- [Twitter extension announcement thread](https://twitter.com/techgeorgii/status/1633818271886585859)
- [TypeScript Chrome Extension boilerplate](https://github.com/harshal-limaye/chrome-extension-boilerplate-react-typescript)

## Tech stack

- React 18 with hooks
- Webpack 5
- TypeScript
- Manifest V3

## Let's make Wizards experience better together
If you want to contribute, you can:
- Open an issue
- Make a PR. When I have time, I'll verify the changes and push them into Chrome Web Store
- Reach me on <a href="https://twitter.com/TechGeorgii" target="_blank"><img src="https://raw.githubusercontent.com/TechGeorgii/github-resources/main/twitter-logo.png"></a> to discuss anything
