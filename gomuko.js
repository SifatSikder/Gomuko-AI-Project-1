const SIZE = 5;
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



var board = initializeBoard()
setmove(board, 0, 0, 1)
setmove(board, 0, 1, 1)
setmove(board, 0, 2, 1)
setmove(board, 0, 3, 1)
setmove(board, 0, 4, 1)

printBoard(board);

staticEval(board);

console.log(boardFull(board));
