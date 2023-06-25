
 //const renderMessage = document.querySelector('#message');
 const MessageController = (()=>{
    const renderMessage = (messsage)=>{
        const messageText = document.querySelector('#message');
        messageText.innerHTML = messsage;
    }
    return{
        renderMessage,
    }

 })();

const gameBoard = (()=>{
let gameboard = ["", "", "", "", "", "", "", "", ""]

const render =()=>{
    let boardHTML = "";
    gameboard.forEach((square, index)=>{
        boardHTML+= `<div class = "square" id= "square-${index}">${square}</div>`
    })

    document.querySelector('#gameBoard').innerHTML = boardHTML;
    const squares = document.querySelectorAll('.square');
    squares.forEach((square)=>{
         square.addEventListener('click',Game.handleClick);
    })
    
}
const update =(index, value)=>{
 gameboard[index] = value;
 render()
}

const getGameBoard = ()=> gameboard;

return {
    render,
    update,
    getGameBoard
}
})();

const createPlayer = (name, mark)=>{
    return {
        name, 
        mark
    }
}

const Game= (()=>{
    let palyers = [];
    let currentPlayerIndex;
    let gameOver ;
    const start =()=>{
        palyers = [
            createPlayer(document.querySelector('#player1').value, 'X'),
            createPlayer(document.querySelector('#player2').value, 'O')
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.render();
        const squares = document.querySelectorAll('.square');
    squares.forEach((square)=>{
         square.addEventListener('click',handleClick);
    })

        

    
    }
    const handleClick = (e)=>{
        if(gameOver){
            return;
        }
        let index = parseInt(e.target.id.split('-')[1]);
        
        if(gameBoard.getGameBoard()[index] !== "")
        return;
    
        gameBoard.update(index, palyers[currentPlayerIndex].mark);
        
        
        if(checkWin(gameBoard.getGameBoard(), palyers[currentPlayerIndex].mark)){
            gameOver = true;
           // renderMessage.innerHTML =  `${palyers[currentPlayerIndex].name} won!`;
           MessageController.renderMessage(`${palyers[currentPlayerIndex].name} won!`);
            
        }else if(checkForDraw(gameBoard.getGameBoard())){
            gameOver = true;
           // renderMessage.innerHTML = `It's a Tie`;
           MessageController.renderMessage(`It's a Tie`);
        }
        currentPlayerIndex = currentPlayerIndex === 0? 1 : 0;
        
        
       
    } 
    const restart = ()=>{
        for(let i =0; i<9; i++){
            gameBoard.update(i, "");
        }
        gameBoard.render();
        gameOver = false;
    }
    return{
        start,
        handleClick,
        restart
    }

})();

function checkWin(board){
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i=0; i<winningCombinations.length; i++){
    const [a, b, c] = winningCombinations[i];
    if( board[a] && board[a] === board[b] && board[a] === board[c]){
     return true;
    }
    }
    return false;
}

function checkForDraw(board){
    return board.every(cell => cell !== "")
}
const startButton = document.querySelector('#start');
const restart = document.querySelector('#restart');
restart.addEventListener('click', function(){
    Game.restart();
    MessageController.renderMessage("");
    //renderMessage.innerHTML = "";
    
})

startButton.addEventListener('click', function(){
    Game.start();
    
   
})