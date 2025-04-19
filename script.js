let specialCode = "mySecretCode"; // Special code to join chat
let adminAccessCode = "7879"; // Admin code to access admin panel
let currentUserName = ""; // Current user's name
let activeUsers = []; // List of active users

const loginButton = document.getElementById("login-button");
const accessCodeInput = document.getElementById("access-code");
const nameInput = document.getElementById("name-input");
const errorMessage = document.getElementById("error-message");
const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const adminIcon = document.getElementById("admin-icon");
const adminPanel = document.getElementById("admin-panel");
const adminCodePrompt = document.getElementById("admin-code-prompt");
const adminCodeInput = document.getElementById("admin-code-input");
const verifyAdminCodeButton = document.getElementById("verify-admin-code-button");
const cancelAdminCodeButton = document.getElementById("cancel-admin-code-button");
const adminCodeError = document.getElementById("admin-code-error");
const closeAdminPanelButton = document.getElementById("close-admin-panel");

loginButton.addEventListener("click", () => {
  const enteredCode = accessCodeInput.value;
  const enteredName = nameInput.value.trim();

  if (!enteredName) {
    errorMessage.textContent = "Please enter your name.";
    return;
  }

  if (enteredCode === specialCode) {
    currentUserName = enteredName;
    activeUsers.push(currentUserName);

    loginScreen.style.display = "none";
    chatScreen.style.display = "block";
  } else {
    errorMessage.textContent = "Incorrect code. Please try again.";
  }
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    addMessage(currentUserName, message, "sent");
    messageInput.value = "";
  }
});

function addMessage(name, message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Admin icon click
adminIcon.addEventListener("click", () => {
  adminCodePrompt.style.display = "block";
});

// Verify admin code
verifyAdminCodeButton.addEventListener("click", () => {
  const enteredAdminCode = adminCodeInput.value.trim();
  if (enteredAdminCode === adminAccessCode) {
    adminCodePrompt.style.display = "none";
    adminPanel.style.display = "block";
    adminCodeInput.value = "";
    adminCodeError.textContent = "";
  } else {
    adminCodeError.textContent = "Incorrect admin code.";
  }
});

// Cancel admin code prompt
cancelAdminCodeButton.addEventListener("click", () => {
  adminCodePrompt.style.display = "none";
  adminCodeInput.value = "";
  adminCodeError.textContent = "";
});

// Close admin panel
closeAdminPanelButton.addEventListener("click", () => {
  adminPanel.style.display = "none";
});
