var socket;

function reconnect(data) {
    console.log("reconnect called");

    socket = io.connect("http://localhost:8080/");

    socket.on("connect", () => {
        socket.emit("joinreq", data);
        console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    });

    // updating chat history on getting a new message
    socket.on("newmsg", (data) => {
        console.log("new msg recieved: " + data.msg);

        chrome.storage.local.get(["chatHistory"], function (result) {
            if (
                result.chatHistory !== undefined &&
                result.chatHistory.msgs !== undefined
            ) {
                var previousHistory = result.chatHistory.msgs;
                // console.log(previousHistory);

                chrome.storage.local.set({
                    chatHistory: {
                        msgs: [
                            ...previousHistory,
                            {
                                username: data.username,
                                msg: data.msg,
                            },
                        ],
                    },
                });
            } else {
                chrome.storage.local.set({
                    chatHistory: {
                        msgs: [
                            {
                                username: data.username,
                                msg: data.msg,
                            },
                        ],
                    },
                });
            }

            chrome.storage.local.get(["chatHistory"], function (result) {
                if (
                    result.chatHistory !== undefined &&
                    result.chatHistory.msgs !== undefined
                ) {
                    console.log(result.chatHistory.msgs);
                }
            });
        });
    });
}

// listen for newlocalmsg and emit to the server
chrome.storage.onChanged.addListener(function (changes) {
    var storageChange = changes["newlocalmsg"];

    if (storageChange !== undefined) {
        console.log(storageChange.oldValue);
        console.log(storageChange.newValue);

        if (storageChange.newValue !== undefined) {
            socket.emit("newmsg", storageChange.newValue);
        }
    }
});

//
chrome.storage.onChanged.addListener(function (changes) {
    var storageChange = changes["user"];

    if (storageChange !== undefined) {
        console.log(storageChange.oldValue);
        console.log(storageChange.newValue);

        if (storageChange.newValue !== undefined) {
            reconnect(storageChange.newValue);
        }
    }
});

console.log("background script is running");
