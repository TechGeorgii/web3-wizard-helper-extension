console.log('Extension started');

chrome.runtime.onMessage.addListener(
    function (request, sender) {
        if (request && request.type == "backgroundLog") {
            console.log(request.message, sender.tab ?
                "from content script:" + sender.tab.url :
                "from extension");
        }
    }
);

console.log('Logger listener is set');
