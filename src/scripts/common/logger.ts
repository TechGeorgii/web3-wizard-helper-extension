declare var __PRODUCTION__: boolean;
class Logger {
    log(message?: any) {
        if (message == null)
            return;

        if (this.isConsoleLog())
            console.log("Dune helper: ", message);
        this.sendToBackground(message);
    }

    error(message?: any) {
        if (message == null)
            return;

        if (this.isConsoleLog())
            console.error("Dune helper: ", message);

        this.sendToBackground(message);
    }

    info(message?: any) {
        if (message == null)
            return;

        if (this.isConsoleLog())
            console.info("Dune helper (info): ", message);
        this.sendToBackground(message);
    }

    isConsoleLog(): boolean {
        if (typeof __PRODUCTION__ != "undefined" && __PRODUCTION__)
            return false;
        return true;
    }

    sendToBackground(message?: any) {
        message = JSON.stringify(message);

        if (chrome && chrome.runtime) {
            chrome.runtime.sendMessage({ type: "backgroundLog", message: message });
        } else if (window) {
            window.postMessage({
                evt: "backgroundLog",
                message: message
            });
        }
    }
}

const logger = new Logger();

export { logger }
