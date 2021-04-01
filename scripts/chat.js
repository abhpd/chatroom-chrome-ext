// Chat

// Setting roomcode display to current roomcode
const roomcodeDisplay = document.getElementById("roomcode-code");
chrome.storage.onChanged.addListener(function (changes) {
    var storageChange = changes["user"];

    if (storageChange !== undefined && storageChange.newValue !== undefined) {
        roomcodeDisplay.innerHTML = `${storageChange.newValue.roomcode} : ${storageChange.newValue.username}`;
    }
});
chrome.storage.local.get(["user"], (result) => {
    if (result.user !== undefined) {
        roomcodeDisplay.innerHTML = `${result.user.roomcode} : ${result.user.username}`;
    }
});
//----------------------------------------------

const sendButton = document.getElementById("send-button");
const inputMsg = document.getElementById("input-msg");

inputMsg.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

sendButton.addEventListener("click", () => {
    const msg = document.getElementById("input-msg").value;
    console.log(msg);

    document.getElementById("input-msg").value = "";

    // saving new msg to chrome storage so that the background script can emit

    chrome.storage.local.get(["user"], (result) => {
        chrome.storage.local.set({
            newlocalmsg: {
                username: result.user.username,
                msg: msg,
            },
        });

        chatHistoryDivGenerator(result.user.username, msg);
    });
});

const chatHistoryDivGenerator = (username, message) => {
    const msg = document.createElement("P");
    msg.innerHTML = username + " : " + message;

    const chatHistory = document.createElement("DIV");
    chatHistory.appendChild(msg);
    chatHistory.classList.add("chat-history");

    const chat = document.getElementById("chc");
    chat.appendChild(chatHistory);

    chatHistory.scrollIntoView();
};

// listner for chathistory to reflect on the chat history display

chrome.storage.local.get(["chatHistory"], function (result) {
    if (
        result.chatHistory !== undefined &&
        result.chatHistory.msgs !== undefined
    ) {
        result.chatHistory.msgs.forEach((msg) => {
            chatHistoryDivGenerator(msg.username, msg.msg);
        });
    }
});

// chrome.storage.onChanged.addListener(function (changes) {
//     // for the end msg
//     var storageChange = changes["chatHistory"];

//     if (storageChange !== undefined && storageChange.newValue !== undefined) {
//         console.log(Number(storageChange.newValue.msgs.length));
//     }
// });

// -----------------------------------------------------------------
