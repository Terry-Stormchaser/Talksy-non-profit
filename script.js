// Firebase configuration (replace with your own configuration from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBX23Wb2QQpdiS50Ta2grjxu8LELNlneww",
  authDomain: "private-chat-4c475.firebaseapp.com",
  databaseURL: "https://private-chat-4c475-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "private-chat-4c475",
  storageBucket: "private-chat-4c475.firebasestorage.app",
  messagingSenderId: "303322714070",
  appId: "1:303322714070:web:4a1cc32e85bf5eec935e77"
};

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, remove, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// DOM Elements
const loginButton = document.getElementById("login-button");
const accessCodeInput = document.getElementById("access-code");
const nameInput = document.getElementById("name-input");
const errorMessage = document.getElementById("error-message");
const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");
const adminIcon = document.getElementById("admin-icon");
const adminPanel = document.getElementById("admin-panel");
const clearChatButton = document.getElementById("clear-chat-button");
const changeCodeButton = document.getElementById("change-code-button");
const newCodeInput = document.getElementById("new-code-input");

let currentUserName = ""; // Store the current user's name
let currentAccessCode = "A330"; // Default access code
let typingTimeout; // Timeout for typing indicator

// Login functionality
loginButton.addEventListener("click", () => {
  const enteredName = nameInput.value.trim();
  const enteredCode = accessCodeInput.value.trim();

  if (!enteredName) {
    errorMessage.textContent = "Please enter your name.";
    return;
  }

  if (enteredCode === currentAccessCode) {
    currentUserName = enteredName;

    // Sign in anonymously with Firebase Authentication
    signInAnonymously(auth).then(() => {
      loginScreen.style.display = "none";
      chatScreen.style.display = "block";

      // Listen for new messages
      const messagesRef = ref(database, 'messages');
      onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        const formattedTime = new Date(message.timestamp).toLocaleTimeString();
        addMessage(message.user, message.text, formattedTime, message.user === currentUserName ? "sent" : "received");
      });
    }).catch((error) => {
      errorMessage.textContent = `Login failed: ${error.message}`;
    });
  } else {
    errorMessage.textContent = "Incorrect code. Please try again.";
  }
});

// Admin panel toggle functionality
adminIcon.addEventListener("click", () => {
  adminPanel.style.display = adminPanel.style.display === "none" || !adminPanel.style.display ? "block" : "none";
});

// Clear chat functionality
clearChatButton.addEventListener("click", () => {
  const messagesRef = ref(database, 'messages');
  remove(messagesRef).then(() => {
    chatBox.innerHTML = ""; // Clear the chat box UI
  });
});

// Change access code functionality
changeCodeButton.addEventListener("click", () => {
  const newCode = newCodeInput.value.trim();
  if (newCode) {
    currentAccessCode = newCode;
    alert("Access code updated successfully!");
    newCodeInput.value = ""; // Clear the input field
  } else {
    alert("Please enter a valid access code.");
  }
});

// Send message functionality
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      user: currentUserName,
      text: message,
      timestamp: serverTimestamp()
    });
    messageInput.value = "";
  }
});

// Function to display messages
function addMessage(name, message, timestamp, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.innerHTML = `<strong>${name}:</strong> ${message} <span class="timestamp">${timestamp}</span>`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
