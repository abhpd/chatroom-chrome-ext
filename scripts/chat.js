// Chat

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
    chatHistoryDivGenerator("abhi", msg);
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
