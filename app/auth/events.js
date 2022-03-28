//file that dictates what is happening behind the scenes


const authApi = require('./api.js')
const authUi = require('./ui.js')
const store = require('../store.js')
const getFormFields = require('../../lib/get-form-fields.js')

const onSignUp = function(event){
    event.preventDefault();
    $('.display-text').text('');

    let form = event.target
    let data = getFormFields(form);


    if(data.credentials.password !== data.credentials.password_confirmation){
        $('.display-text').text('Passwords do not match');
    }else{

        authApi
            .signUp(data)
            .then(() => authUi.onSignUpSuccess())
            .catch(() => authUi.onSignUpFailure(data))
    }
}

const onSignIn = function(event){
    event.preventDefault();
    $('.display-text').text('');

    let form = event.target
    let data = getFormFields(form);

        authApi
            .signIn(data)
            .then((response) => authUi.onSignInSuccess(response))
            .catch(() => authUi.onSignInFailure())
    
}

const onNewGame = function(){
    const guest = $('#guest').val();
        authApi
            .newGame()
            .then((response) => authUi.onNewGame(response, guest))
            .catch(() => console.log("failure"))
    
}

const onUpdateGame = function (){

}

module.exports = {
    onSignUp,
    onSignIn,
    onNewGame
}