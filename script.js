// Firebase configuration (replace with your own configuration)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM elements
const loginButton = document.getElementById("login-button");
const accessCodeInput = document.getElementById("access-code");
const nameInput = document.getElementById("name-input");
const errorMessage = document.getElementById("error-message");
const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

let currentUserName = ""; // Store the current user's name

// Login functionality
loginButton.addEventListener("click", () => {
    const enteredName = nameInput.value.trim();
    const enteredCode = accessCodeInput.value.trim();

    if (!enteredName) {
        errorMessage.textContent = "Please enter your name.";
        return;
    }

    if (enteredCode === "mySecretCode") {
        currentUserName = enteredName;
        loginScreen.style.display = "none";
        chatScreen.style.display = "block";

        // Listen for new messages
        const messagesRef = ref(database, 'messages');
        onChildAdded(messagesRef, (snapshot) => {
            const message = snapshot.val();
            addMessage(message.user, message.text, message.user === currentUserName ? "sent" : "received");
        });
    } else {
        errorMessage.textContent = "Incorrect code. Please try again.";
    }
});

// Send message functionality
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        const messagesRef = ref(database, 'messages');
        push(messagesRef, { user: currentUserName, text: message });
        messageInput.value = "";
    }
});

// Function to display messages
function addMessage(name, message, type) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);
    messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
