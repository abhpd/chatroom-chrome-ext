const socket = io("http://localhost:8080/");

socket.on("connect", () => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

console.log("background script is running");
