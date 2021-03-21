const enterRoomBtn = document.getElementById("enter-room");

function switchViewToChat() {
    const chatContainer = document.getElementById("chatview");

    chatContainer.classList.remove("display-none");

    const loginContainerHolder = document.getElementById("loginview");

    loginContainerHolder.classList.add("display-none");
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
