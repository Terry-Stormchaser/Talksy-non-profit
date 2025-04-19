const specialCode = "mySecretCode";
const loginButton = document.getElementById("login-button");
const accessCodeInput = document.getElementById("access-code");
const errorMessage = document.getElementById("error-message");
const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

loginButton.addEventListener("click", () => {
  const enteredCode = accessCodeInput.value;
  if (enteredCode === specialCode) {
    loginScreen.style.display = "none";
    chatScreen.style.display = "block";
  } else {
    errorMessage.textContent = "Incorrect code. Please try again.";
  }
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    messageInput.value = "";
  }
});
