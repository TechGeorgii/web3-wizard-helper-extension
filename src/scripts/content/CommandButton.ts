import { logger } from "../common/logger";

class CommandButton {
    private btn: HTMLButtonElement;

    constructor(toolbar: Element, text: string, command: string) {
        this.btn = document.createElement("button");
        this.btn.title = text;
        this.btn.disabled = true;
        this.btn.className = "duneHelperTbBtn";
        const svgURL = chrome.runtime.getURL(`icons/${command}.svg`);

        fetch(svgURL)
            .then((response) => response.text())
            .then((svgCode) => this.btn.innerHTML = svgCode);

        this.btn.onclick = () => {
            if (!this.btn.disabled) {
                window.postMessage({ evt: "cmd", command: command });
            }
        };
        toolbar.appendChild(this.btn);
    }

    set enabled(en: boolean) {
        this.btn.disabled = !en;
    }
}

export { CommandButton }
