class Field {
    constructor(field){
        this._field = field;
    }
    static printField(field){
        for(const row of field) {
            console.log(row);
        }
    }
    static createField(num) {
        let newField = []
        for (let i = 0; i < num; i++){
            newField.push([]);
            for(let j = 0; j < num; j++) {
                newField[i].push(j);
            }
        }
        //Places player
        newField[0][0] = '*';
        //Places hat 
        newField[newField.length - 1][Math.floor(Math.random()*newField[0].length)] = '^';
    
        populateWorld(newField);
    
        return hasPath(newField) ? newField : Field.createField(num);
    
    }
}


function populateWorld(field){
    for (let i = 0; i < field.length; i ++){
        for( let j = 0; j < field[0].length; j++){
            if (field[i][j] === '*' || field[i][j] === '^'){
                continue;
            } else {
                let randomNum = Math.floor(Math.random()* 8);
                randomNum < 2 ? field[i][j] = '░' : field[i][j] = 'O';
            }
        }
    } 
}

function hasPath(field){
/*
    //Returns an array of [y, x] that are possible next step to the hat and 'X' that mark a block it can't go to
    function findPossibleNextStep(x, y, maze) {
        const possibleNextSteps = [];

        if (y + 1 < maze.length && maze[y + 1][x] !== 'O' && maze[y + 1][x] !== 'X' ){
            possibleNextSteps.push([y + 1, x]);
        } else {
            possibleNextSteps.push('X');
        }
        if (y - 1 >= 0 && maze[y - 1][x] !== 'O' && maze[y - 1][x] !== 'X'){
            possibleNextSteps.push([y - 1, x]);
        }  else {
            possibleNextSteps.push('X');
        }
        if (x + 1 < maze[0].length && maze[y][x + 1] !== 'O' && maze[y][x + 1] !== 'X'){
            possibleNextSteps.push([y, x + 1]);
        }  else {
            possibleNextSteps.push('X');
        }
        if (x - 1 >= 0 && maze[y][x - 1] !== 'O' && maze[y][x - 1] !== 'X'){
            possibleNextSteps.push([y, x - 1]);
        }  else {
            possibleNextSteps.push('X');
        }
        console.log(possibleNextSteps);
        return possibleNextSteps;
        
    }

    //Checks a Possiblenextstep array to see if it contains at least one value pair
    function checkPossibleNextStep(possibleNextSteps) {
        for (const step of possibleNextSteps) {
            if (step !== 'X') {
                return true;
            }
        }
        return false;
    }

    //Checks a Possiblenextstep array to see if it contains the value to the hat
    function checkPossibleNextStepForHat(possibleNextSteps, field, x, y) {
        for (const step of possibleNextSteps){
            if (step === 'X') {
                continue;
            } 
            if ((field[step[0]][step[1]]) === '^'){
                return true;
            }
        }
        return false;
    }

    //replace with X the value of the  block that was just tested for possible path
    function crossPreviousBlock(x, y, field){
        field[y][x] = 'X';
    }

*/ // useless thanks to chatgpt :(
    const testField = structuredClone(field)
    let x = 0, y = 0;


    //chat gpt generated code, SHAME :( (i understand what i does tho, yeah me !)
    function path(field, x, y) {
        if (x < 0 || x >= field[0].length || y < 0 || y >= field.length || field[y][x] === 'O') {
            return false;
        }
    
        if (field[y][x] === '^') {
            return true;
        }
    
        // Mark the current cell as visited
        field[y][x] = 'O';
    
        // Explore all possible directions
        if (path(field, x + 1, y) || path(field, x - 1, y) || path(field, x, y + 1) || path(field, x, y - 1)) {
            return true;
        } else {
            return false;
        }
        
    }
    //end of chat gpt generated code :(
    

    return path(testField, x, y);

}


module.exports = {
    hasPath,
    populateWorld,
    Field,
};