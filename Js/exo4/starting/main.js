const fieldMaker = require('./Field.js'); // Adjust the path as needed

const { Field, hasPath, populateWorld } = fieldMaker;

const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let currentCoordinates = [0, 0];

function theGame() {

    const playground = Field.createField(5);


    while (playground[currentCoordinates] !== 'O' && playground[currentCoordinates] !== '^') {

        Field.printField(playground);
        let userChoice;
        let UserChoiceisValid = false;

        while ((userChoice !== 'up' || userChoice !== 'down' || userChoice !== 'left' || userChoice !== 'right') && !UserChoiceisValid) {
            userChoice = prompt('what is your choice (up, down, left, or right) ?');

            switch (userChoice) {
                case 'up': 
                    userChoice = [-1, 0];
                    break;
                case 'down':
                    userChoice = [1, 0];
                    break;
                case 'left': 
                    userChoice = [0, -1];
                    break;
                case 'right':
                    userChoice = [0, 1];
                    break;
            }
            currentCoordinates[0] + userChoice[0] > playground.length || currentCoordinates[0] + userChoice[0] < 0 || currentCoordinates[1] + userChoice[1] > playground[0].length || currentCoordinates[1] + userChoice[1] < 0 ? console.log('invalid input') : UserChoiceisValid = true;
        }

        const direction = playground[currentCoordinates[0] + userChoice[0]][currentCoordinates[1] + userChoice[1]];
        console.log(direction);

        if (direction === '░') {
            playground[currentCoordinates[0]][currentCoordinates[1]] = '░';  
            currentCoordinates[0] += userChoice[0];
            currentCoordinates[1] += userChoice[1];
            playground[currentCoordinates[0]][currentCoordinates[1]] = '*';
        } else if (direction ==='^') {
            console.log('You won the game ! good job !');
            theGame();
        } else {
            console.log('You fell in the hole :(');
            theGame();
        }
        

        
    }

}

theGame();