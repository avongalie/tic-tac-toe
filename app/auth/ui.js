//file that deals with what the user sees

const store = require('../store.js');

const onSignUpSuccess = function(){
    $('#sign-up').hide();
    $('#sign-in').show();
    $('form').trigger('reset');
    $('.display-text').text('Please sign in with your account details');
    
}

const onSignUpFailure = function(data){
    $('.display-text').text(`Account with ${data.credentials.email} already exists`);
}

const onSignInSuccess = function(response){
    console.log(response);
    $('.display-text').text('');
    $('form').trigger('reset');
    $('#sign-in').hide();
    $('#begin-game').show();
    $('#welcome').text(`Welcome ${response.user.email}`);
    store.user = response.user;

}

const onSignInFailure = function(){
    $('.display-text').text('Email or Password is incorrect');
}

const onChangePasswordSuccess = function(){

}

const onChangePasswordFailure = function(){

}

const onNewGameSuccess = function(response, guest){
    $('#begin-game').hide();
    $('#game').show();
    $('#player1').text(`Player1: ${store.user.email}`);
    $('#player2').text(`Player2: ${guest}`);
    store.game = response.game;
}

const onUpdateGameSuccess = function(){

}

const onSignOut = function(){

    $('#player1').show();
    $('#player2').show();
    $('#begin-game').hide();
    $('#game').hide();
    $('#homepage').show();
    
}

module.exports = {
    onSignUpFailure,
    onSignUpSuccess,
    onSignInFailure,
    onSignInSuccess,
    onNewGameSuccess,
    onSignOut
}