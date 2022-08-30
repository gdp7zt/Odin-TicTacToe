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
            if((gameboard[winConditions[i][0]] === 'X' && gameboard[winConditions[i][1]] === 'X' && gameboard[winConditions[i][2]] === 'X') || 
               (gameboard[winConditions[i][0]] === 'O' && gameboard[winConditions[i][1]] === 'O' && gameboard[winConditions[i][2]] === 'O')){
                winMessage.innerHTML = 'There is a winner!';
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
        if(counter === 9 && winMessage.innerHTML !== 'There is a winner!'){
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

    return {getGameboard, addMark, checkWin};
})();

const player = (XorO) => {
    const name = '';
    return {XorO, name};
}

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

            return false;
        };
    }
    let player1 = player('X');
    let player2 = player('O');

    startGame();
    gameBoard.getGameboard();

})();




