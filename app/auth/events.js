//file that dictates what is happening behind the scenes


const authApi = require('./api.js')
const authUi = require('./ui.js')
const store = require('../store.js')
const getFormFields = require('../../lib/get-form-fields.js')

let plays = 0;
let currentLetter = "X";
let currentPlayer = "player1";
let guest = "";
let gameStatus = false;

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

const onNewGame = function(event){
    event.preventDefault();
    guest = $('#guest').val();
        authApi
            .newGame()
            .then((response) => authUi.onNewGameSuccess(response, guest))
            .catch(() => console.log("failure"))

        
  $('#game').on('click', onUpdateGame);
    
}

const onUpdateGame = function (event){
    let gameCell = event.target
    let cellIndex = gameCell.getAttribute('data-cell-index');
    if(cellIndex === null)return;
    //console.log(event);
    if(gameCell.innerText !== "") return;
    store.game.cells[cellIndex] = currentLetter;
    //console.log(store.game.cells)
    gameCell.innerText = currentLetter;
    plays += 1;
    if(plays > 4) checkWin();
    authApi.updateGame(cellIndex, currentLetter, gameStatus)
            //.then((response) => console.log(response))
    //console.log(store.game);
    if(currentLetter === "X"){
        currentLetter = "O";
        currentPlayer = "player2";
    }else{
        currentLetter = "X";
        currentPlayer = "player1";
    }
}

function checkWin(){
    let game = $('#gameboard > div')
    let gameCheckBoard = [];
    game.each(function(){
            if($(this)[0].innerText === currentLetter){
                gameCheckBoard.push(1);
            }else{
                gameCheckBoard.push(0)
            }
        }
    )
    //console.log(gameCheckBoard);
    const row1 = gameCheckBoard.slice(0,3);
    const row2 = gameCheckBoard.slice(3,6);
    const row3 = gameCheckBoard.slice(6,9);
    const col1 = getColumn(gameCheckBoard, 0);
    const col2 = getColumn(gameCheckBoard, 1);
    const col3 = getColumn(gameCheckBoard, 2);
    const dia1 = [gameCheckBoard[0],gameCheckBoard[4], gameCheckBoard[8]];
    const dia2 = [gameCheckBoard[2],gameCheckBoard[4], gameCheckBoard[6]];
    
    let winPossibilites = [];
    winPossibilites.push(row1, row2, row3, col1, col2, col3, dia1, dia2);
    winPossibilites.forEach(function(item){
        let r = 0;
        for(let i = 0; i < item.length; i++){
            if(item[i] === 1){
                r += 1;
                //console.log(item[i])
                //console.log(r);
                if(r === 3){
                    //win stuff
                    console.log(`${currentLetter} won!`)
                    gameStatus = true;
                    gameOver();
                }
            }else{
                break;
            }
        }
    })

}

function getColumn(array, index){
    let r = [];
    for(let i = index; i < array.length; i+=3){
        r.push(array[i]);
    }
    return r;
}

function gameOver(){
    //store game over in object;

  $('#game').off('click', onUpdateGame)
  if(currentPlayer === "player1"){
    $('#player1').text(`${store.user.email} won!`);
    $('#player2').hide();
  }else{
    $('#player2').text(`${guest} won!`);
    $('#player1').hide();
  }

}

module.exports = {
    onSignUp,
    onSignIn,
    onNewGame,
    onUpdateGame,
}

/*

win conditonals

012
345
678

036
147
258

048
246

*/