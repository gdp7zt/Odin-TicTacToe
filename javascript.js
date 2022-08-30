const player = (XorO) => {
    const name = '';
    return {XorO, name};
}

let player1 = player('X');
let player2 = player('O');

const gameBoard = (() => {
    let gameboard = ['','','',
                     '','','',
                     '','',''];

    const getGameboard = () => {
        let container = document.querySelector(".gameBoardContainer");
        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
        for (let i = 0; i < 9; i++){
            let newElement = document.createElement('button');
            newElement.classList.add('box');
            newElement.setAttribute('data-v', i);
            newElement.innerHTML = gameboard[i];
            container.appendChild(newElement);
            whenClick(newElement, i);
        }
    }

    const whenClick = (element, position) => {
        element.addEventListener('click', () =>{
            let counter = 0;
            for (let j = 0; j < gameboard.length; j++){
                if(gameboard[j] === '') counter++;
            }
            if(counter % 2 == 1) addMark(position, 'X');
            else addMark(position, 'O');
        })
    }

    const addMark = (location, XorO) => {
        if(gameboard[location] === ''){
            gameboard[location] = XorO;
        }
        getGameboard();
        checkWin();
    }

    const checkWin = () => {
        winConditions = [[0, 1, 2],
                         [3, 4, 5],
                         [6, 7, 8],
                         [0, 3, 6],
                         [1, 4, 7],
                         [2, 5, 8],
                         [0, 4, 8],
                         [6, 4, 2]];
        let counter = 0;
        let winMessage = document.querySelector(".winMessage");
        let buttons = document.querySelectorAll('.box');
        for(let i = 0; i < 8; i++){
            if((gameboard[winConditions[i][0]] === 'X' && gameboard[winConditions[i][1]] === 'X' && gameboard[winConditions[i][2]] === 'X')){
                winMessage.innerHTML = player1.name + " is the winner!";
                for(let j = 0; j < 9; j++){
                    buttons[j].setAttribute('disabled', '');
                }
            }
            if((gameboard[winConditions[i][0]] === 'O' && gameboard[winConditions[i][1]] === 'O' && gameboard[winConditions[i][2]] === 'O')){
                winMessage.innerHTML = player2.name + " is the winner!";
                for(let j = 0; j < 9; j++){
                    buttons[j].setAttribute('disabled', '');
                }
            }
        }
        for(let i = 0; i < 9; i++){
            if(gameboard[i] === 'O' || gameboard[i] === 'X'){
                counter += 1;
            }
        }
        if(counter === 9 && winMessage.innerHTML === ''){
            winMessage.innerHTML = 'It is a tie!';
        }

        if(winMessage.innerHTML !== ''){
            let resetButton = document.querySelector('.resetButton');
            resetButton.classList.remove('hidden');

            resetButton.addEventListener('click', () => {
                gameboard = ['','','',
                             '','','',
                             '','',''];
                for(let j = 0; j < 9; j++){
                    buttons[j].removeAttribute('disabled');
                }
                getGameboard();
                winMessage.innerHTML = '';
                resetButton.classList.add('hidden');
            })
        }
    }

    return {getGameboard};
})();

const gameFlow = (() => {
    const startGame = () => {
        let startButton = document.createElement('input');
        startButton.setAttribute('type', 'button');
        startButton.classList.add('startButton');
        startButton.setAttribute('id', 'startButton');
        startButton.value = 'Start!';
        let main = document.querySelector('.main');
        main.appendChild(startButton);

        startButton.addEventListener('click', () =>{
            main.removeChild(startButton);
            inputScreen();
        })
    }

    const inputScreen = () => {
        let form = document.querySelector('.form');
        form.classList.remove('hidden');
        let beginGame = document.querySelector('#beginGame');
        beginGame.onclick = () =>{ 
            let firstName = document.querySelector('.player1');
            player1.name = firstName.value;
            let secondName = document.querySelector('#player2');
            player2.name = secondName.value;
            form.classList.add('hidden');
            let gameboard = document.querySelector('.gameBoardContainer');
            gameboard.classList.remove('hidden');
            playerInfo();
            return false;
        };
    }

    const playerInfo = () => {
        const players = document.querySelectorAll('.playerInfo');
        players[0].classList.remove('hidden');
        let playerName1 = document.createElement('div');
        playerName1.innerHTML = player1.name;
        playerName1.classList.add('playerNames');
        players[0].appendChild(playerName1);
        let playerMarker1 = document.createElement('div');
        playerMarker1.innerHTML = "\"" + player1.XorO + "\"";
        playerMarker1.classList.add('playerMarker');
        players[0].appendChild(playerMarker1);

        players[1].classList.remove('hidden');
        let playerName2 = document.createElement('div');
        playerName2.innerHTML = player2.name;
        playerName2.classList.add('playerNames');
        players[1].appendChild(playerName2);
        let playerMarker2 = document.createElement('div');
        playerMarker2.innerHTML = "\"" + player2.XorO + "\"";
        playerMarker2.classList.add('playerMarker');
        players[1].appendChild(playerMarker2);

        gameBoard.getGameboard();
    }

    startGame();

})();




