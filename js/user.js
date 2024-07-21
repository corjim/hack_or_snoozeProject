
"use strict";

let currentUser; // Declaring a global variable for currentUser.

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  // pick up the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  
  currentUser = await User.login(username, password); // Retrieves user info from API and store it as a global variable.

  $loginForm.trigger("reset"); // Resets forms after submission.

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", login);

// Handle signup form submission.

async function signup(evt) {
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  
  currentUser = await User.signup(username, password, name); // Retrieves user info from API and store it as a global variable.

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset"); // Resets form on submission
}

$signupForm.on("submit", signup);


// Log out button click
function logout(evt) {
  location.reload(); // Refreshes and removes credentials from localStorage.
}

$navLogOut.on("click", logout);


// Function to remember previously logged in user.
async function checkForRememberedUser() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  currentUser = await User.loginViaStoredCredentials(token, username);
}

// Store/save user's credentials in locaStorage.
function saveUserCredentialsInLocalStorage() {
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

// Updates Nav bar with User's profile.
async function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  hidePageComponents();

  // re-display stories (so that "favorite" stars can appear)
  putStoriesOnPage();
  $allStoriesList.show();

  updateNavOnLogin();
  generateUserProfile();
  $storiesContainer.show()
}

// Show a "user profile" part of page built from the current user's info.

function generateUserProfile() {

  $("#profile-name").text(currentUser.name);
  $("#profile-username").text(currentUser.username);
  $("#profile-account-date").text(currentUser.createdAt.slice(0, 10));
}
