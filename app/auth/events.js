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
let tie = false;
let color1 = "red";
let color2 = "blue";
let currentColor = color1;

const onSignUp = function(event){
    event.preventDefault();
    $('.display-text').text('');

    let form = event.target
    let data = getFormFields(form);

    if(data.credentials.email === ""){
        $('.display-text').text('Please enter email');
    }else if((data.credentials.password === "") || (data.credentials.password_confirmation === "")){
        $('.display-text').text('Please enter password');
    }else if(data.credentials.password !== data.credentials.password_confirmation){
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

const onSignOut = function(){
    authApi.signOut()
            .then(function(){
                authUi.onSignOut()
                clearBoard();
            })
}

const onNewGame = function(event){
    event.preventDefault();
    plays = 0;
    tie = false;
    gameStatus = false;
    currentLetter = "X"
    urrentColor = color1;
    if($('#guest').val() === ""){
        guest = "guest";
    }else{
        guest = $('#guest').val();
    }
    $('#guest').val("");
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
    console.log(gameCell);
    $(gameCell).css('color', currentColor);
    plays += 1;
    if(plays > 4) checkWin();
    if(plays === 9 && tie === true) gameOver();
    authApi.updateGame(cellIndex, currentLetter, gameStatus)
            .then((response) => console.log(response))
    //console.log(store.game);
    if(currentLetter === "X"){
        currentLetter = "O";
        currentPlayer = "player2";
        currentColor = color2;
    }else{
        currentLetter = "X";
        currentPlayer = "player1";
        currentColor = color1;
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
                   // console.log(`${currentLetter} won!`)
                    gameStatus = true;
                    gameOver();
                }
            }else{
                break;
            }
        }
    })

    if(plays === 9 && gameStatus === false) tie = true;

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
  if(tie === true){
    $('#player1').text(`It's a Tie!`);
    $('#player2').hide();
  }else{
    if(currentPlayer === "player1"){
        $('#player1').html(`<span style="color: ${color1};">X</span> ${store.user.email} won!`);
        $('#player2').hide();
    }else{
        $('#player2').html(`<span style="color: ${color2};">O</span> ${guest} won!`);
        $('#player1').hide();
    }
    }
}

function clearBoard(){
    $('#gameboard > div').each(function(){
        $(this)[0].innerText = "";
    })
}

const restartGame = function(){
    plays = 0;
    tie = false;
    gameStatus = false;
    currentLetter = "X";
    currentColor = color1;
    clearBoard();
    $('#player1').show();
    $('#player2').show();
    $('#game').hide();
    $('#begin-game').show();
}

module.exports = {
    onSignUp,
    onSignIn,
    onNewGame,
    onUpdateGame,
    onSignOut,
    restartGame
}
exports.color1 = color1;
exports.color2 = color2;

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