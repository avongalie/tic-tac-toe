function returnHome(){
    $('#sign-up').hide();
    $('#sign-in').hide();
    $('#homepage').show();
    $('.display-text').text("");
}

function signUpClick(){
    $('#homepage').hide();
    $('#sign-up').show();
}

function signInClick(){
    $('#homepage').hide();
    $('#sign-in').show();
}

module.exports = {
    signUpClick,
    signInClick,
    returnHome
}