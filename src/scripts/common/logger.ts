class Logger {
    log(message?: any) {
        if (message == null)
            return;

        console.log("Dune helper: ", message);
        this.sendToBackground(message);
    }

    error(message?: any) {
        if (message == null)
            return;

        console.error("Dune helper: ", message);
        this.sendToBackground(message);
    }

    info(message?: any) {
        if (message == null)
            return;

        console.info("Dune helper (info): ", message);
        this.sendToBackground(message);
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
