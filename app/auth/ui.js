//file that deals with what the user sees

const onSignUpSuccess = function(){
    $('#sign-up').hide();
    $('#sign-in').show();
    $('.display-text').text('Please sign in with your account details');
    
}

const onSignUpFailure = function(data){
    $('.display-text').text(`Account with ${data.credentials.email} already exists`)
}

const onSignInSuccess = function(){

}

const onSignInFailure = function(){

}

const onChangePasswordSuccess = function(){

}

const onChangePasswordFailure = function(){

}

const onNewGame = function(){

}

const onUpdateGame = function(){

}

const onSignOut = function(){
 //would we need a success vs failure?????
}

module.exports = {
    onSignUpFailure,
    onSignUpSuccess
}