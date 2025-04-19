// Select relevant elements
const adminIcon = document.getElementById("admin-icon");
const adminCodePrompt = document.getElementById("admin-code-prompt");
const adminPanel = document.getElementById("admin-panel");
const adminCodeInput = document.getElementById("admin-code-input");
const verifyAdminCodeButton = document.getElementById("verify-admin-code-button");
const cancelAdminCodeButton = document.getElementById("cancel-admin-code-button");
const adminCodeError = document.getElementById("admin-code-error");
const closeAdminPanelButton = document.getElementById("close-admin-panel");

const adminAccessCode = "7879"; // Admin code to access admin panel

// Add functionality to the plane icon
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
