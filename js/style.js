
"use strict";

// Declaring all DOM elements

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoritedStories = $("#favorited-stories");
const $ownStories = $("#my-stories");
const $storiesContainer = $("#stories-container")


// selector that finds all three story lists
const $storiesLists = $(".stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $submitForm = $("#submit-form");

const $navSubmitStory = $("#nav-submit-story");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $userProfile = $("#user-profile");


//  Hides and Shows individual components upon call.
function hidePageComponents() {
  const components = [
    $storiesLists,
    $submitForm,
    $loginForm,
    $signupForm,
    $userProfile
  ];
  components.forEach(c => c.hide());
}


// Kick off function
async function start() {
  console.debug("start");
  
  await checkForRememberedUser(); // Remember credentials in localStorage.
  await getAndShowStoriesOnStart(); // Show story of logged-in user.

  if (currentUser) updateUIOnUserLogin(); // Updates if there is logged-in user.
}

// $(start);

start();