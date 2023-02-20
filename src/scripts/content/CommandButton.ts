import { logger } from "../common/logger";
import { SVGIcons } from "./icons";

class CommandButton {
    private btn: HTMLButtonElement;
    private enabled: boolean = false;

    constructor(toolbar: Element, text: string, command: string) {
        this.btn = document.createElement("button");
        this.btn.title = text;
        this.btn.disabled = true;
        this.btn.className = "duneHelperTbBtn";
        this.btn.innerHTML = SVGIcons[command];

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
