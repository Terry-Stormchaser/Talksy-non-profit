// Firebase configuration (replace with your own configuration from Firebase Console)
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyBX23Wb2QQpdiS50Ta2grjxu8LELNlneww",
  authDomain: "private-chat-4c475.firebaseapp.com",
  databaseURL: "https://private-chat-4c475-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "private-chat-4c475",
  storageBucket: "private-chat-4c475.firebasestorage.app",
  messagingSenderId: "303322714070",
  appId: "1:303322714070:web:4a1cc32e85bf5eec935e77"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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

let currentUserName = ""; // Store the current user's name
let typingTimeout; // Timeout for typing indicator

// Login functionality
loginButton.addEventListener("click", () => {
    const enteredName = nameInput.value.trim();
    const enteredCode = accessCodeInput.value.trim();

    if (!enteredName) {
        errorMessage.textContent = "Please enter your name.";
        return;
    }

    if (enteredCode === "A330") {
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

// Add "user is typing..." functionality
messageInput.addEventListener("input", () => {
    const typingRef = ref(database, 'typing');
    push(typingRef, { user: currentUserName });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        // Clear typing indicator after 3 seconds of inactivity
        const clearTypingRef = ref(database, 'typing');
        push(clearTypingRef, { user: null });
    }, 3000);
});

// Listen for typing indicator updates
const typingRef = ref(database, 'typing');
onChildAdded(typingRef, (snapshot) => {
    const typingData = snapshot.val();
    if (typingData.user && typingData.user !== currentUserName) {
        typingIndicator.textContent = `${typingData.user} is typing...`;
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            typingIndicator.textContent = '';
        }, 3000);
    } else {
        typingIndicator.textContent = ''; // Clear indicator
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

// Firebase Authentication state listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in as:", user.uid);
    }
});
