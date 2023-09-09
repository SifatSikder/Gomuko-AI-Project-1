const SIZE = 10;
const MAX_DEPTH = 3
function initializeBoard() {
    var board = [];
    for (let i = 0; i < SIZE; i++) {
        var row = [];
        for (let j = 0; j < SIZE; j++) {
            row.push(0);
        }
        board.push(row)
    }
    return board
}

function createLinearArray(board) {

    var linearArray = []
    for (let i = 0; i < board.length; i++) {
        linearArray.push(board[i]);
    }

    for (let j = 0; j < board[0].length; j++) {
        let verticalArray = []
        for (let i = 0; i < board.length; i++) {
            verticalArray.push(board[i][j])
        }
        linearArray.push(verticalArray);
    }

    function findDiagonals(board) {
        const numRows = board.length;
        const numCols = board[0].length;

        // Initialize arrays to store main and secondary diagonals
        const diagonals = [];


        // Find main diagonals
        for (let i = 0; i < numRows; i++) {
            const diagonal = [];
            for (let j = 0; j < numCols; j++) {
                if (i + j < numCols) {
                    diagonal.push(board[i + j][j]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        for (let j = 1; j < numCols; j++) {
            const diagonal = [];
            for (let i = 0; i < numRows; i++) {
                if (i + j < numRows) {
                    diagonal.push(board[i][i + j]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        // Find secondary diagonals
        for (let i = 0; i < numRows; i++) {
            const diagonal = [];
            for (let j = 0; j < numCols; j++) {
                if (i + j < numRows) {
                    diagonal.push(board[i + j][numCols - 1 - j]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        for (let j = numCols - 2; j >= 0; j--) {
            const diagonal = [];
            for (let i = 0; i < numRows; i++) {
                if (i + j < numCols - 1) {
                    diagonal.push(board[i][numCols - 2 - j - i]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        return diagonals;
    }
    const diagonals = findDiagonals(board);
    diagonals.forEach(diagonal => {
        linearArray.push(diagonal);
    });

    return linearArray;
}

function createIndexArray(board) {

    var indexes = []
    for (let i = 0; i < board.length; i++) {
        var rowIndexes = []
        for (let j = 0; j < board[0].length; j++) {
            rowIndexes.push([i, j]);
        }
        indexes.push(rowIndexes)
    }

    for (let j = 0; j < board[0].length; j++) {
        var colIndexes = []
        for (let i = 0; i < board.length; i++) {
            colIndexes.push([i, j])
        }
        indexes.push(colIndexes);
    }

    function findDiagonals(board) {
        const numRows = board.length;
        const numCols = board[0].length;

        // Initialize arrays to store main and secondary diagonals
        const diagonals = [];


        // Find main diagonals
        for (let i = 0; i < numRows; i++) {
            const diagonal = [];
            for (let j = 0; j < numCols; j++) {
                if (i + j < numCols) {
                    diagonal.push([i + j, j]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        for (let j = 1; j < numCols; j++) {
            const diagonal = [];
            for (let i = 0; i < numRows; i++) {
                if (i + j < numRows) {
                    diagonal.push([i, i + j]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        // Find secondary diagonals
        for (let i = 0; i < numRows; i++) {
            const diagonal = [];
            for (let j = 0; j < numCols; j++) {
                if (i + j < numRows) {
                    diagonal.push([i + j, numCols - 1 - j]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        for (let j = numCols - 2; j >= 0; j--) {
            const diagonal = [];
            for (let i = 0; i < numRows; i++) {
                if (i + j < numCols - 1) {
                    diagonal.push([i, numCols - 2 - j - i]);
                }
            }
            if (diagonal.length > 4) {
                diagonals.push(diagonal);
            }
        }

        return diagonals;
    }


    const diagonalIndexes = findDiagonals(board);
    diagonalIndexes.forEach(diagonalIndex => {
        indexes.push(diagonalIndex);
    });

    return indexes;
}


function blanks(board) {
    var blanks = [];
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (board[i][j] === 0) {
                blanks.push([i, j])
            }
        }
    }
    return blanks;
}
function findFirstPositionOfBlack(board) {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (board[i][j] === 1) {
                return ([i, j])
            }
        }
    }
}

function boardFull(board) {
    return blanks(board).length === 0 ? true : false
}

function winningPlayer(linearBoard, player) {
    var win = false;
    for (let i = 0; i < linearBoard.length; i++) {
        for (let j = 0; j < linearBoard[i].length - 4; j++) {
            var count = 0
            for (let k = 0; k < 5; k++) {
                if (linearBoard[i][j + k] === player) count++;
                if (count == 5) { win = true; return win }
            }
        }
    }
    return win;
}

function gameWon(linearBoard) {

    return winningPlayer(linearBoard, 1) || winningPlayer(linearBoard, -1)
}

function setmove(board, row, col, player) {
    board[row][col] = player;
}

function initiate(order) {

    board = initializeBoard()
    if (order == 2) currentPlayer = -1
    else currentPlayer = 1

}

function printResult(linearBoard) {
    if (winningPlayer(linearBoard, 1))
        return 1

    else if (winningPlayer(linearBoard, -1))
        return -1

    else return 0

}

function stateScore(consecutive, openEnds, currentTurn) {
    if (openEnds == 0 && consecutive < 5)
        return 0;
    switch (consecutive) {
        case 4:
            switch (openEnds) {
                case 1:
                    if (currentTurn)
                        return 100000000;
                    return 50;
                case 2:
                    if (currentTurn)
                        return 100000000;
                    return 500000;
            }
        case 3:
            switch (openEnds) {
                case 1:
                    if (currentTurn)
                        return 7;
                    return 5;
                case 2:
                    if (currentTurn)
                        return 10000;
                    return 50;
            }
        case 2:
            switch (openEnds) {
                case 1:
                    return 2;
                case 2:
                    return 5;
            }
        case 1:
            switch (openEnds) {
                case 1:
                    return 0.5;
                case 2:
                    return 1;
            }
        default:
            return 200000000;
    }
}

function score(board, countFor, current_turn) {
    var score = 0;
    var countConsecutive = 0;
    var openEnds = 0;

    for (var i = 0; i < board.length; i++) {
        for (var a = 0; a < board[i].length; a++) {
            if (board[i][a] == countFor) countConsecutive++;
            else if (board[i][a] == 0 && countConsecutive > 0) {
                openEnds++;
                score += stateScore(countConsecutive, openEnds, current_turn == countFor);
                countConsecutive = 0;
                openEnds = 1;
            }
            else if (board[i][a] == 0)
                openEnds = 1;
            else if (countConsecutive > 0) {
                score += stateScore(countConsecutive, openEnds, current_turn == countFor);
                countConsecutive = 0;
                openEnds = 0;
            }
            else openEnds = 0;
        }
        if (countConsecutive > 0)
            score += stateScore(countConsecutive, openEnds, current_turn == countFor);
        countConsecutive = 0;
        openEnds = 0;
    }
    return countFor * score;
}

function totalScore(board, current_turn) {
    return score(board, 1, current_turn) + score(board, -1, current_turn)
}
function abminimax(board, depth, maxDepth, alpha, beta, player) {
    var row = -1
    var col = -1
    if (depth < maxDepth || gameWon(createLinearArray(board))) {
        return [row, col, totalScore(createLinearArray(board), player)]
    }
    else {

        var cells = blanks(board)
        for (let i = 0; i < cells.length; i++) {

            setmove(board, cells[i][0], cells[i][1], player)
            var Score = abminimax(board, depth - 1, maxDepth, alpha, beta, -player)
            if (player == 1) {
                if (Score[2] > alpha) {
                    alpha = Score[2]
                    row = cells[i][0]
                    col = cells[i][1]
                }
            }
            else {
                if (Score[2] < beta) {
                    beta = Score[2]
                    row = cells[i][0]
                    col = cells[i][1]
                }
            }
            setmove(board, cells[i][0], cells[i][1], 0)
            if (alpha >= beta) break
        }
        if (player == 1)
            return [row, col, alpha]
        else
            return [row, col, beta]

    }

}

function fourInARow(board, opponentPlayer) {
    var linearBoard = createLinearArray(board)
    var indexes = createIndexArray(board)

    var present = false;
    var index;
    for (let i = 0; i < linearBoard.length; i++) {
        for (let j = 0; j < linearBoard[i].length - 4; j++) {
            var count = 0
            for (let k = 0; k < 5; k++) {
                if (linearBoard[i][j + k] === opponentPlayer) count++;
                if (count == 4 && ((linearBoard[i][j + k - 4] === 0) || (linearBoard[i][j + k + 1] === 0))) {
                    if (linearBoard[i][j + k - 4] === 0)
                        index = indexes[i][j + k - 4]
                    else if (linearBoard[i][j + k + 1] === 0)
                        index = indexes[i][j + k + 1]
                    present = true;
                    return { present: present, index: index }
                }
            }
        }
    }
    return { present: present, index: index }

}


function AIMove(board, currentPlayer) {


    if (blanks(board).length == SIZE * SIZE) {
        return [(SIZE / 2) - 1, (SIZE / 2) - 1]
    }
    else if (blanks(board).length == SIZE * SIZE - 1) {
        var position = findFirstPositionOfBlack(board)
        var neighbours = []
        neighbours.push([position[0], position[1] + 1])
        neighbours.push([position[0], position[1] - 1])
        neighbours.push([position[0] + 1, position[1]])
        neighbours.push([position[0] - 1, position[1]])
        neighbours.push([position[0] - 1, position[1] - 1])
        neighbours.push([position[0] - 1, position[1] + 1])
        neighbours.push([position[0] + 1, position[1] - 1])
        neighbours.push([position[0] + 1, position[1] + 1])
        neighbours = neighbours.filter(checkValidPosition);


        return neighbours[Math.floor(Math.random() * neighbours.length)];


        function checkValidPosition(neighbour) {
            return (neighbour[0] > 0 && neighbour[0] < SIZE) && (neighbour[1] > 0 && neighbour[1] < SIZE);
        }

    }

    const { present, index } = fourInARow(board, -currentPlayer)
    if (present) {
        setmove(board, index[0], index[1], currentPlayer)
        console.log([index[0], index[1]]);
        return [index[0], index[1]]
    }
    else {
        result = abminimax(board, blanks(board).length, blanks(board).length - MAX_DEPTH + 1, -Infinity, Infinity, currentPlayer)
        setmove(board, result[0], result[1], currentPlayer)
        console.log([result[0], result[1]]);
        return [result[0], result[1]]
    }
}


var currentPlayer;
var board;


function gameFinished(board) {
    return boardFull(board) || gameWon(createLinearArray(board))
}

function playerMove(row, col) {
    if (!(boardFull(board) || gameWon(createLinearArray(board)))) {
        setmove(board, row, col, currentPlayer)
        currentPlayer *= -1
    }

    if (gameFinished(board)) return { AImove: false, move: '', gameFinished: gameFinished(board), result: printResult(createLinearArray(board)) }
    else {
        var move = AIMove(board, currentPlayer);
        currentPlayer *= -1
        return { AImove: true, move: move, gameFinished: gameFinished(board), result: printResult(createLinearArray(board)) }
    }
}

module.exports = { initiate, playerMove };
