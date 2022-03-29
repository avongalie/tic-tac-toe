//file that grabs from the API
const store = require('../store.js');


const signUp = function(data) {
    return $.ajax({
        method: 'POST',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
        data
    })
}

const signIn = function(data) {
    return $.ajax({
        method: 'POST',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in',
        data
    })
}

const signOut = function() {
    return $.ajax({
        method: 'DELETE',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        }
    })
}

const changePassword = function(data) {
    return $.ajax({
        method: 'PATCH',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/change-password',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        },
        data
    })
}

const newGame = function() {
    return $.ajax({
        method: 'POST',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/games',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        }
    })
}

const updateGame = function(index, value, gameStatus) {
    return $.ajax({
        method: 'PATCH',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/games/' + store.game._id,
        //might need game ID instead?
        headers: {
            Authorization: 'Bearer ' + store.user.token
        },
    data:{
        "game": {
            "cell": {
              "index": index,
              "value": value
            },
            "over": gameStatus
          }
    }
    })
}

module.exports = {
    signUp,
    signIn,
    signOut,
    changePassword,
    newGame,
    updateGame
}