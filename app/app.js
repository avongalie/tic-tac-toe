// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const display = require('./display.js')

$(() => {
  // your JS code goes here
  $('#sign-up').hide();
  $('#sign-in').hide();
  $('#begin-game').hide();
  $('#game').hide();
  $('#sign-up-button').on("click", display.signUpClick)
  $('#sign-in-button').on("click", display.signInClick)
  $('.return-home').on("click", display.returnHome)
  $('#sign-up-form').on("submit", authEvents.onSignUp);
  $("#sign-in-form").on("submit", authEvents.onSignIn);
  $('#start-game').on('click', authEvents.onNewGame);
 // $('#game').on('click', authEvents.onUpdateGame)
 $('.sign-out').on('click', authEvents.onSignOut);
 $('#new-game').on('click', authEvents.restartGame)
})
