var currentBoard = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
];

var winConditions = [
    // Horizontal Rows
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Vertical Rows
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Diagonal Rows
    [0,4,8],
    [2,4,6]
];

function checkForEnd(gameBoard) {
    var knotsWin;
    var crossesWin;

    for (row of winConditions) {
        knotsWin = true;
        crossesWin = true;

        for (cell of row) {
            knotsWin = knotsWin && gameBoard[cell] == "O";
            crossesWin = crossesWin && gameBoard[cell] =="X";
        }

        if (knotsWin) {
            return "O";
        } else if (crossesWin) {
            return "X";
        }
    }

    if (gameBoard.indexOf(" ") < 0) { // Check for empty cells
        return "D"; // No wins and no empty cells. Draw
    } else {
        return ""; // Game not finished
    }
}

function findBestNextMove(gameBoard, player) {
    var bestMove = -1;

    for (var i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] == " ") {
            var outcome = projectOutcome(gameBoard, i, player);

            if (outcome == player) { // Winning move
                return i;
            } else if (outcome == "D") { // Draw is better than losing
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function projectOutcome(gameBoard, move, player) {
    var gameBoardCopy = [...gameBoard];
    var worstEnd = null;

    gameBoardCopy[move] = player;
    var end = checkForEnd(gameBoardCopy);
    if (end) {
        return end;
    } else {
        return projectOutcome(gameBoardCopy, findBestNextMove(gameBoardCopy, player == "O" ? "X" : "O"), player == "O" ? "X" : "O");
    }
}

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent("divGameDisplay");

    strokeWeight(10);
    strokeCap(round);
}

function draw() {
    drawBoard();
}

function drawBoard() {
    background(255);
    stroke(0);
    line(140, 20, 140, 380);
    line(260, 20, 260, 380);
    line(20, 140, 380, 140);
    line(20, 260, 380, 260);

    // Row 1
    if (currentBoard[0] == "X") {
        drawCross(20,20);
    } else if (currentBoard[0] == "O") {
        drawKnot(20,20);
    }

    if (currentBoard[1] == "X") {
        drawCross(140,20);
    } else if (currentBoard[1] == "O") {
        drawKnot(140,20);
    }

    if (currentBoard[2] == "X") {
        drawCross(260,20);
    } else if (currentBoard[2] == "O") {
        drawKnot(260,20);
    }

    // Row 2
    if (currentBoard[3] == "X") {
        drawCross(20,140);
    } else if (currentBoard[3] == "O") {
        drawKnot(20,140);
    }

    if (currentBoard[4] == "X") {
        drawCross(140,140);
    } else if (currentBoard[4] == "O") {
        drawKnot(140,140);
    }

    if (currentBoard[5] == "X") {
        drawCross(260,140);
    } else if (currentBoard[5] == "O") {
        drawKnot(260,140);
    }

    // Row 3
    if (currentBoard[6] == "X") {
        drawCross(20,260);
    } else if (currentBoard[6] == "O") {
        drawKnot(20,260);
    }

    if (currentBoard[7] == "X") {
        drawCross(140,260);
    } else if (currentBoard[7] == "O") {
        drawKnot(140,260);
    }

    if (currentBoard[8] == "X") {
        drawCross(260,260);
    } else if (currentBoard[8] == "O") {
        drawKnot(260,260);
    }
}

function mouseClicked() {
    if (20 <= mouseX && mouseX < 140 && 20 <= mouseY && mouseY < 140 && currentBoard[0] == " ") { currentBoard[0] = "X"; }
    if (140 <= mouseX && mouseX < 260 && 20 <= mouseY && mouseY < 140 && currentBoard[1] == " ") { currentBoard[1] = "X"; }
    if (260 <= mouseX && mouseX < 380 && 20 <= mouseY && mouseY < 140 && currentBoard[2] == " ") { currentBoard[2] = "X"; }
    if (20 <= mouseX && mouseX < 140 && 140 <= mouseY && mouseY < 260 && currentBoard[3] == " ") { currentBoard[3] = "X"; }
    if (140 <= mouseX && mouseX < 260 && 140 <= mouseY && mouseY < 260 && currentBoard[4] == " ") { currentBoard[4] = "X"; }
    if (260 <= mouseX && mouseX < 380 && 140 <= mouseY && mouseY < 260 && currentBoard[5] == " ") { currentBoard[5] = "X"; }
    if (20 <= mouseX && mouseX < 140 && 260 <= mouseY && mouseY < 380 && currentBoard[6] == " ") { currentBoard[6] = "X"; }
    if (140 <= mouseX && mouseX < 260 && 260 <= mouseY && mouseY < 380 && currentBoard[7] == " ") { currentBoard[7] = "X"; }
    if (260 <= mouseX && mouseX < 380 && 260 <= mouseY && mouseY < 380 && currentBoard[8] == " ") { currentBoard[8] = "X"; }

    drawBoard();

    if (checkForEnd(currentBoard)) {
        noLoop();
    } else {
        currentBoard[findBestNextMove(currentBoard, "O")] = "O";
    }

    drawBoard();

    if (checkForEnd(currentBoard)) {
        noLoop();
    }
}

function drawCross(x, y) {
    stroke(0,0,255);
    line(x + 20, y + 20, x + 100, y + 100);
    line(x + 20, y + 100, x + 100, y + 20);
}

function drawKnot(x, y) {
    stroke(255,0,0);
    circle(x + 60, y + 60, 80);
}