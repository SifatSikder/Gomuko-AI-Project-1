const SIZE = 10;
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

function setmove(board, row, col, player) {
    board[row][col] = player;
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

function boardFull(board) {
    return blanks(board).length === 0 ? true : false
}

function printBoard(board) {
    chars = { '1': 'X', '-1': 'O', '0': ' ' }
    for (let i = 0; i < SIZE; i++) {
        process.stdout.write(i + ' ')
        for (let j = 0; j < SIZE; j++) {
            var ch = chars[board[i][j]]
            process.stdout.write(`| ${ch} |` + ' ')
        }
        console.log('\n' + '-------------------------------------------------------------')
    }
    console.log('=============================================================');
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

// function verticalScore(board, countFor, current_turn) {
//     var score = 0;
//     var countConsecutive = 0;
//     var openEnds = 0;

//     for (var i = 0; i < board[0].length; i++) {
//         for (var a = 0; a < board.length; a++) {
//             if (board[a][i] == countFor) countConsecutive++;
//             else if (board[a][i] == 0 && countConsecutive > 0) {
//                 openEnds++;
//                 score += stateScore(countConsecutive, openEnds, current_turn == countFor);
//                 countConsecutive = 0;
//                 openEnds = 1;
//             }
//             else if (board[a][i] == 0)
//                 openEnds = 1;
//             else if (countConsecutive > 0) {
//                 score += stateScore(countConsecutive, openEnds, current_turn == countFor);
//                 countConsecutive = 0;
//                 openEnds = 0;
//             }
//             else openEnds = 0;
//         }
//         if (countConsecutive > 0)
//             score += stateScore(countConsecutive, openEnds, current_turn == countFor);
//         countConsecutive = 0;
//         openEnds = 0;
//     }
//     return countFor * score;
// }

// function diagonalScore(board, countFor, current_turn) {

//     function findDiagonals(board) {
//         const numRows = board.length;
//         const numCols = board[0].length;

//         // Initialize arrays to store main and secondary diagonals
//         const diagonals = [];


//         // Find main diagonals
//         for (let i = 0; i < numRows; i++) {
//             const diagonal = [];
//             for (let j = 0; j < numCols; j++) {
//                 if (i + j < numCols) {
//                     diagonal.push(board[i + j][j]);
//                 }
//             }
//             if (diagonal.length > 4) {
//                 diagonals.push(diagonal);
//             }
//         }

//         for (let j = 1; j < numCols; j++) {
//             const diagonal = [];
//             for (let i = 0; i < numRows; i++) {
//                 if (i + j < numRows) {
//                     diagonal.push(board[i][i + j]);
//                 }
//             }
//             if (diagonal.length > 4) {
//                 diagonals.push(diagonal);
//             }
//         }

//         // Find secondary diagonals
//         for (let i = 0; i < numRows; i++) {
//             const diagonal = [];
//             for (let j = 0; j < numCols; j++) {
//                 if (i + j < numRows) {
//                     diagonal.push(board[i + j][numCols - 1 - j]);
//                 }
//             }
//             if (diagonal.length > 4) {
//                 diagonals.push(diagonal);
//             }
//         }

//         for (let j = numCols - 2; j >= 0; j--) {
//             const diagonal = [];
//             for (let i = 0; i < numRows; i++) {
//                 if (i + j < numCols - 1) {
//                     diagonal.push(board[i][numCols - 2 - j - i]);
//                 }
//             }
//             if (diagonal.length > 4) {
//                 diagonals.push(diagonal);
//             }
//         }

//         return diagonals;
//     }
//     const diagonals = findDiagonals(board);
//     return (horizontalScore(diagonals, countFor, current_turn));
// }

// function totalScoreCalculation(board, countFor, current_turn) {
//     return horizontalScore(board, countFor, current_turn)
//         + verticalScore(board, countFor, current_turn)
//         + diagonalScore(board, countFor, current_turn)
// }

// function totalScore(board, current_turn) {
//     console.log(totalScoreCalculation(board, 1, current_turn));
//     console.log(totalScoreCalculation(board, -1, current_turn));
//     return totalScoreCalculation(board, 1, current_turn) + totalScoreCalculation(board, -1, current_turn)
// }

// function staticEval(matrix) {
//     // let a = horizontalScore(matrix) || 0;
//     // let b = verticalScore(matrix) || 0;
//     // let c = diagonalScore(matrix) || 0;
//     // return a + b + c;
//     console.log(horizontalScore(matrix));

//     // perform static analysis on the rows of the board
//     function horizontalScore(matrix) {
//         let score = 0;

//         for (let i = 0; i < matrix.length; i++) {
//             let current = 0;
//             let streak = 0;

//             for (let j = 0; j < matrix[i].length; j++) {
//                 ({ current, streak, score } = scoreConsecutive(matrix[i][j], current, streak, score));
//             }

//             if (current !== 0) {
//                 score += current * adjacentBlockScore(streak);
//             }
//         }

//         return score;
//     }

//     // score a consecutive group of blocks
//     function scoreConsecutive(block, current, streak, score) {
//         if (block !== current) {
//             if (current !== 0) {
//                 score += current * adjacentBlockScore(streak);
//             }
//             current = block;
//             streak = 1;
//         } else {
//             if (block !== 0) streak++;
//         }
//         return {
//             'current': current,
//             'streak': streak,
//             'score': score
//         };
//     }

//     /** *
//         * score a consecutive group of blocks
//         *   count:  number in a row
//         *
//     */
//     function adjacentBlockScore(count) {
//         const scoreMatrix = [0, 2, 4, 8, 16, 32];

//         try {
//             return scoreMatrix[count];
//         } catch (e) {
//             return -1;
//         }
//     }

//     // static analysis on columns
//     function verticalScore(matrix) {
//         let score = 0;

//         for (let i = 0; i < matrix[0].length; i++) {
//             let current = 0;
//             let streak = 0;

//             for (let j = 0; j < matrix.length; j++) {
//                 console.log(j, i);
//                 ({ current, streak, score } = scoreConsecutive(matrix[j][i], current, streak, score));
//             }

//             if (current !== 0) {
//                 score += current * adjacentBlockScore(streak);
//             }
//         }

//         return -1 * score;
//     }

//     // static analysis on diagonals
//     function diagonalScore(matrix) {
//         // return 0;

//         let len = matrix.length, score = 0;
//         let res = { d1: {}, d2: {}, d3: {}, d4: {} };

//         for (let i = 4; i < len; i++) {

//             // set current and streak to 0 for each diagonal
//             for (let key in res) {
//                 res[key] = { streak: 0, current: 0, score: 0 };
//             }

//             for (let j = 0; j <= i; j++) {
//                 let x = i - j;
//                 let y = j;
//                 res.d1 = process(matrix[i - j][j], res.d1);

//                 x = len - 1 - j;
//                 y = i - j;
//                 res.d2 = process(matrix[len - 1 - j][i - j], res.d2);

//                 x = j;
//                 y = len - 1 - i + j;
//                 res.d3 = process(matrix[j][len - 1 - i + j], res.d3);

//                 x = len - 1 - i;
//                 y = len - 1 - j;
//                 res.d4 = process(matrix[len - 1 - i + j][len - 1 - j], res.d4);
//             }

//             score += res.d1.score + res.d2.score +
//                 res.d3.score + res.d4.score;
//         }

//         return -1 * score;

//         function process(block, obj) {
//             return scoreConsecutive(block, obj.current, obj.streak, obj.score);
//         }
//     }


// }

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

function winningPlayer(board, player) {
    var win = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length - 4; j++) {
            var count = 0
            for (let k = 0; k < 5; k++) {
                if (board[i][j + k] === player) count++;
                if (count == 5) { win = true; return win }
            }
        }
    }
    return win;
}

function gameWon(board) {

    return winningPlayer(board, 1) || winningPlayer(board, -1)
}

function printResult(board) {
    if (winningPlayer(board, 1))
        console.log('X has won! ' + '\n')

    else if (winningPlayer(board, -1))
        console.log('O has won!  ' + '\n')

    else
        console.log('Draw' + '\n')
}

function playerMove(board, currentPlayer) {
    while (true) {
        try {
            const prompt = require("prompt-sync")({ sigint: true });
            const row = prompt('Enter row number between 1-10: ');
            if (row < 1 && row > 10) console.log('PLEASE PICK ROW NUMBER WITHIN 1 TO 10');
            else {
                const column = prompt('Enter column number between 1-10: ');
                if (column < 1 && column > 10) console.log('PLEASE PICK COLUMN NUMBER WITHIN 1 TO 10');
                else {
                    setmove(board, row - 1, column - 1, currentPlayer)
                    printBoard(board)
                    return
                }
            }

        } catch (error) {
            console.log('Please enter your move positions');
        }
    }
}

function AIMove(board, currentPlayer) {

    if (blanks(board).length == SIZE * SIZE) {
        console.log('will do it later');
    }
    else {
        result = abminimax(board, blanks(board).length, -Infinity, Infinity, currentPlayer)
        setmove(board, result[0], result[1], currentPlayer)
        printBoard(board)
    }
}


function abminimax(board, depth, alpha, beta, player) {

}

function makeMove(board, currentPlayer) {

    if (currentPlayer == 1)
        playerMove(board, currentPlayer)
    else
        AIMove(board, currentPlayer)
}

function playGomuko() {

    let order
    while (true) {
        try {
            const prompt = require("prompt-sync")({ sigint: true });
            order = prompt('Enter to play 1st or 2nd: ');
            console.log(order);
            if (order != 1 && order != 2) console.log('PLEASE PICK 1 OR 2');
            else break;

        } catch (error) {
            console.log('Please enter your play position');
        }
    }
    var board = initializeBoard()
    var currentPlayer;
    if (order == 2) currentPlayer = -1
    else currentPlayer = 1


    var linearBoard = (createLinearArray(board));
    while (!(boardFull(board) || gameWon(linearBoard))) {
        console.log('code is here');
        makeMove(board, currentPlayer)
        currentPlayer *= -1
    }
    printResult(linearBoard)


}







// setmove(board, 0, 1, 1)
// setmove(board, 0, 2, 1)
// setmove(board, 0, 3, 1)
// setmove(board, 0, 4, 1)

// setmove(board, 0, 5, -1)
// setmove(board, 0, 6, -1)
// setmove(board, 0, 7, -1)
// setmove(board, 0, 8, -1)
// setmove(board, 0, 9, -1)


// setmove(board, 1, 0, 1)
// setmove(board, 2, 0, 1)
// setmove(board, 3, 0, 1)

// setmove(board, 5, 0, -1)
// setmove(board, 6, 0, -1)
// setmove(board, 7, 0, -1)


// setmove(board, 1, 1, 1)
// setmove(board, 2, 2, 1)
// setmove(board, 3, 3, 1)

// setmove(board, 5, 5, -1)
// setmove(board, 6, 6, -1)
// setmove(board, 7, 7, -1)

playGomuko()


// printBoard(board);


// console.log(gameWon(linearBoard))
// printResult(linearBoard)

// console.log(score(linearBoard, 1, 1));
// console.log(score(linearBoard, -1, 1));

// console.log(score(linearBoard, 1, -1));
// console.log(score(linearBoard, -1, -1));

// console.log(totalScore(board, 1));


// console.log(totalScore(board, -1));



