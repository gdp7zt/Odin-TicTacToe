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
            let newElement = document.createElement('div');
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
    }

    return {getGameboard, addMark};
})();

const player = (XorO) => {

    return {XorO};
}

const gameFlow = (() => {
    let player1 = player('X');
    let player2 = player('O');
    gameBoard.getGameboard();


})();




