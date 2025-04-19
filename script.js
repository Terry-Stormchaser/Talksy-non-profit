const specialCode = "mySecretCode"; // Special code to join chat
const adminAccessCode = "7879"; // Admin code to access admin panel

let currentUserName = ""; // Store the current user's name

const loginButton = document.getElementById("login-button");
const accessCodeInput = document.getElementById("access-code");
const nameInput = document.getElementById("name-input");
const errorMessage = document.getElementById("error-message");
const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Admin panel elements
const adminIcon = document.getElementById("admin-icon");
const adminCodePrompt = document.getElementById("admin-code-prompt");
const adminCodeInput = document.getElementById("admin-code-input");
const verifyAdminCodeButton = document.getElementById("verify-admin-code-button");
const cancelAdminCodeButton = document.getElementById("cancel-admin-code-button");
const adminCodeError = document.getElementById("admin-code-error");
const adminPanel = document.getElementById("admin-panel");
const closeAdminPanelButton = document.getElementById("close-admin-panel");

// Login functionality
loginButton.addEventListener("click", () => {
  const enteredName = nameInput.value.trim();
  const enteredCode = accessCodeInput.value.trim();

  if (!enteredName) {
    errorMessage.textContent = "Please enter your name.";
    return;
  }

  if (enteredCode === specialCode) {
    currentUserName = enteredName;
    loginScreen.style.display = "none";
    chatScreen.style.display = "block";
  } else {
    errorMessage.textContent = "Incorrect code. Please try again.";
  }
});

// Send message functionality
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
  adminCodePrompt.style.display = "block"; // Show the admin code prompt
});

// Verify the admin code
verifyAdminCodeButton.addEventListener("click", () => {
  const enteredAdminCode = adminCodeInput.value.trim();
  if (enteredAdminCode === adminAccessCode) {
    adminCodePrompt.style.display = "none"; // Hide the prompt
    adminPanel.style.display = "block"; // Show the admin panel
    adminCodeInput.value = ""; // Clear the input
    adminCodeError.textContent = ""; // Clear any errors
  } else {
    adminCodeError.textContent = "Incorrect admin code. Please try again.";
  }
});

// Cancel the admin code prompt
cancelAdminCodeButton.addEventListener("click", () => {
  adminCodePrompt.style.display = "none"; // Hide the prompt
  adminCodeInput.value = ""; // Clear the input
  adminCodeError.textContent = ""; // Clear any errors
});

// Close the admin panel
closeAdminPanelButton.addEventListener("click", () => {
  adminPanel.style.display = "none"; // Hide the admin panel
});
