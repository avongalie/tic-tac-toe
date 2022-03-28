//file that dictates what is happening behind the scenes


const authApi = require('./api.js')
const authUi = require('./ui.js')
const store = require('../store.js')
const getFormFields = require('../../lib/get-form-fields.js')

const onSignUp = function(event){
    $('.display-text').text('');
    event.preventDefault();

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

module.exports = {
    onSignUp
}