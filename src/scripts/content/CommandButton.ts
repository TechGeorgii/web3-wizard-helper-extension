class CommandButton {
    private btn: HTMLButtonElement;
    private enabled: boolean = false;

    constructor(toolbar: Element, text: string, command: string) {
        this.btn = document.createElement("button");
        this.btn.textContent = text;
        this.btn.className = "duneHelperDisBtn";
        this.btn.onclick = () => {
            if (this.enabled) {
                window.postMessage({ evt: "cmd", command: command });
            }
        };
        toolbar.appendChild(this.btn);

        window.addEventListener("message", (event) => {
            if (event.source !== window || event.data.evt !== "lexemChanged") {
                return;
            }
            this.enabled = !(event.data.lexem == null || event.data.lexem == "");
            this.btn.className = this.enabled ? "duneHelperEnbBtn" : "duneHelperDisBtn";
        });
    }
}

export { CommandButton }
