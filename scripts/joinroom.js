const enterRoomBtn = document.getElementById("enter-room");
const exitRoomButton = document.getElementById("exitRoom-button");

function switchViewToChat() {
    const chatContainer = document.getElementById("chatview");
    chatContainer.classList.remove("display-none");

    const loginContainerHolder = document.getElementById("loginview");
    loginContainerHolder.classList.add("display-none");
}

function switchViewToLogin() {
    const chatContainer = document.getElementById("chatview");
    chatContainer.classList.add("display-none");

    const loginContainerHolder = document.getElementById("loginview");
    loginContainerHolder.classList.remove("display-none");
}

enterRoomBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const usernameValue = document.getElementById("username").value;
    const roomcodeValue = document.getElementById("roomcode").value;

    chrome.storage.local.set({
        user: {
            username: usernameValue,
            roomcode: roomcodeValue,
        },
    });

    chrome.storage.local.get(["user"], function (result) {
        console.log("Value currently is " + result.user.username);
    });

    switchViewToChat();
});

exitRoomButton.addEventListener("click", () => {
    switchViewToLogin();
    chrome.storage.local.remove(["user"]);
    chrome.storage.local.remove(["chatHistory"]);
    document.getElementById("chc").innerHTML = "";
});

chrome.storage.local.get(["user"], function (result) {
    if (
        result.user !== undefined &&
        result.user.username !== "" &&
        result.user.roomcode !== ""
    ) {
        switchViewToChat();
    } else {
        switchViewToLogin();
    }
});
