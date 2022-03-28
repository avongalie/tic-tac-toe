//file that deals with what the user sees

const onSignUpSuccess = function(){
    $('#sign-up').hide();
    $('#sign-in').show();
    $('.display-text').text('Please sign in with your account details');
    
}

const onSignUpFailure = function(data){
    $('.display-text').text(`Account with ${data.credentials.email} already exists`)
}

module.exports = {
    onSignUpFailure,
    onSignUpSuccess
}