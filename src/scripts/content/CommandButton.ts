import { logger } from "../common/logger";

class CommandButton {
    private btn: HTMLButtonElement;
    private enabled: boolean = false;

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

        window.addEventListener("message", (event) => {
            if (event.source !== window || event.data.evt !== "lexemChanged") {
                return;
            }
            this.btn.disabled = (event.data.lexem == null || event.data.lexem == "");
        });
    }
}

export { CommandButton }
