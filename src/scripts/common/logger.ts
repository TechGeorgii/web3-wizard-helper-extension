class Logger {
    log(message?: any) {
        if (message != null)
            console.log("Dune helper: " + message)
    }

    error(message?: any) {
        if (message != null)
            console.error("Dune helper: " + message)
    }

    info(message?: any) {
        if (message != null)
            console.info("Dune helper (info): " + message)
    }
}

const logger = new Logger();

export { logger }
