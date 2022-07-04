let gameState = {
    turn: 0,
    columns: [
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " "]
    ]
}

function setup() {
    createCanvas(900, 600);
    noStroke();
}

function draw() {
    background(200, 200, 255);

    fill(255, 200, 200);
    rect(Math.floor(mouseX / 100.0) * 100, 0, 100, 600);

    for (var column = 0; column < 9; column++) {
        for (var row = 0; row < 6; row++) {
            if (gameState.columns[column][row] == " ") {
                fill(255);
                circle(column * 100 + 50, row * 100 + 50, 80);
            } else if (gameState.columns[column][row] == "R") {
                fill(255,0,0);
                circle(column * 100 + 50, row * 100 + 50, 80);
            } else if (gameState.columns[column][row] == "Y") {
                fill(255,255,0);
                circle(column * 100 + 50, row * 100 + 50, 80);
            }
        }
    }
}

function mouseClicked() {
    var column = Math.floor(mouseX / 100.0);

    if (gameState.columns[column][0] == " ") {
        dropPiece(gameState, column, "Y");
    }

    if (checkForEnd(gameState) != " ") {
        noLoop();
    } else {
        dropPiece(gameState, chooseMove(), "R");
    }

    if (checkForEnd(gameState) != " ") {
        noLoop();
    }
}

function dropPiece(currentGameState, column, color) {
    for (var row = 5; row >= 0; row--) {
        if (currentGameState.columns[column][row] == " ") {
            currentGameState.columns[column][row] = color;
            break;
        }
    }
}

function checkForEnd(currentGameState) {
    //Horizontal
    for (var column = 0; column < 5; column++) {
        for (var row = 0; row < 6; row++) {
            if (
                currentGameState.columns[column][row] == "Y"
                && currentGameState.columns[column + 1][row] == "Y"
                && currentGameState.columns[column + 2][row] == "Y"
                && currentGameState.columns[column + 3][row] == "Y"
            ) {
                console.log("Horizontal win for Yellow");
                return "Y";
            } else if (
                currentGameState.columns[column][row] == "R"
                && currentGameState.columns[column + 1][row] == "R"
                && currentGameState.columns[column + 2][row] == "R"
                && currentGameState.columns[column + 3][row] == "R"
            ) {
                console.log("Horizontal win for Red");
                return "R";
            }
        }
    }

    //Vertical
    for (var column = 0; column < 9; column++) {
        for (var row = 0; row < 3; row++) {
            if (
                currentGameState.columns[column][row] == "Y"
                && currentGameState.columns[column][row + 1] == "Y"
                && currentGameState.columns[column][row + 2] == "Y"
                && currentGameState.columns[column][row + 3] == "Y"
            ) {
                console.log("Vertical win for Yellow");
                return "Y";
            } else if (
                currentGameState.columns[column][row] == "R"
                && currentGameState.columns[column][row + 1] == "R"
                && currentGameState.columns[column][row + 2] == "R"
                && currentGameState.columns[column][row + 3] == "R"
            ) {
                console.log("Vertical win for Red");
                return "R";
            }
        }
    }

    //Upward Diagonal
    for (var column = 0; column < 5; column++) {
        for (var row = 0; row < 3; row++) {
            if (
                currentGameState.columns[column + 3][row] == "Y"
                && currentGameState.columns[column + 2][row + 1] == "Y"
                && currentGameState.columns[column + 1][row + 2] == "Y"
                && currentGameState.columns[column][row + 3] == "Y"
            ) {
                console.log("Upward Diagonal win for Yellow");
                return "Y";
            } else if (
                currentGameState.columns[column + 3][row] == "R"
                && currentGameState.columns[column + 2][row + 1] == "R"
                && currentGameState.columns[column + 1][row + 2] == "R"
                && currentGameState.columns[column][row + 3] == "R"
            ) {
                console.log("Upward Diagonal win for Red");
                return "R";
            }
        }
    }

    //Downward Diagonal
    for (var column = 0; column < 5; column++) {
        for (var row = 0; row < 3; row++) {
            if (
                currentGameState.columns[column][row] == "Y"
                && currentGameState.columns[column + 1][row + 1] == "Y"
                && currentGameState.columns[column + 2][row + 2] == "Y"
                && currentGameState.columns[column + 3][row + 3] == "Y"
            ) {
                console.log("Downward Diagonal win for Yellow");
                return "Y";
            } else if (
                currentGameState.columns[column][row] == "R"
                && currentGameState.columns[column + 1][row + 1] == "R"
                && currentGameState.columns[column + 2][row + 2] == "R"
                && currentGameState.columns[column + 3][row + 3] == "R"
            ) {
                console.log("Downward Diagonal win for Red");
                return "R";
            }
        }
    }

    if (
        currentGameState.columns[0][0] == " "
        || currentGameState.columns[1][0] == " "
        || currentGameState.columns[2][0] == " "
        || currentGameState.columns[3][0] == " "
        || currentGameState.columns[4][0] == " "
        || currentGameState.columns[5][0] == " "
        || currentGameState.columns[6][0] == " "
        || currentGameState.columns[7][0] == " "
    ) {
        return " ";
    } else {
        return "D";
    }
}

function chooseMove() {
    var validMoves = [];

    for (var redColumn = 0; redColumn < 9; redColumn++) {
        if (gameState.columns[redColumn][0] == " ") {
            var candidateRedGame = copyGameState(gameState);

            dropPiece(candidateRedGame, redColumn, "R");
            if (checkForEnd(candidateRedGame) == "R") {
                console.log("Returning winning move.")
                return redColumn;
            }

            var isSafeMove = true;
            for (var yellowColumn = 0; yellowColumn < 9; yellowColumn++) {
                if (candidateRedGame.columns[redColumn][0] == " ") {
                    var candidateYellowGame = copyGameState(candidateRedGame);

                    dropPiece(candidateYellowGame, yellowColumn, "Y");

                    isSafeMove = isSafeMove && (checkForEnd(candidateYellowGame) != "Y");
                }
            }
                
            if (isSafeMove) {
                validMoves.push(redColumn);
            }
        }
    }

    return validMoves[Math.floor(Math.random() * validMoves.length)];
}

function copyGameState(currentGameState) {
    return {
        turn : currentGameState.turn,
        columns : [
            [...currentGameState.columns[0]],
            [...currentGameState.columns[1]],
            [...currentGameState.columns[2]],
            [...currentGameState.columns[3]],
            [...currentGameState.columns[4]],
            [...currentGameState.columns[5]],
            [...currentGameState.columns[6]],
            [...currentGameState.columns[7]],
            [...currentGameState.columns[8]]
        ]
    };
}