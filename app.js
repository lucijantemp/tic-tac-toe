// GAMEBOARD MODULE - used for displaying and manipulating board and checking winner
const gameBoard = (() => {

    const gameboard = [
        [0, 1, 1], 
        [0, 1, 0], 
        [1, 0, 1]
    ]
    
    // function for manipulating the board
    const modifyBoard = (row, column, value) => {
        gameboard[row][column] = value
    }

    // functions for checking winner (return winner if there is any, otherwise return false)
    // checks rows for winner
    const _checkRows = () => {
        for (let i=0; i<gameboard.length; i++) {
            let row = gameboard[i]
            if (row.every(val => val === row[0])) {
                return row[0]
            }
        } 
        return false
    }
    // checks columns for winner
    const _checkCols = () => {
        for (let i=0; i<gameboard[0].length; i++) {
            let column = []
            for (let j=0; j<gameboard.length; j++) {
                column.push(gameboard[j][i])
            }
            if (column.every(val => val === column[0])) {
                return column[0]
            }
        }
        return false
    }
    // checks diagonals for winner
    const _checkDiags = () => {
        // first diagonal ( \ ) descending
        let diagDesc = []
        for (let i=0; i<gameboard.length; i++) {
            diagDesc.push(gameboard[i][i])
        }
        if (diagDesc.every(val => val === diagDesc[0])) {
            return diagDesc[0]
        }
        // second diagonal ( / ) ascending
        let diagAsc = []
        for (let i=0; i<gameboard.length; i++) {
            diagAsc.push(gameboard[gameboard.length - i - 1][i])
        }
        if (diagAsc.every(val => val === diagAsc[0])) {
            return diagAsc[0]
        }
        return false
    } 
    // combines above 3 functions together
    const checkWin = () => {
        return (_checkRows() || _checkCols() || _checkDiags())
    }

    // makes sure we can use only public functions and properties
    return {gameboard, modifyBoard, checkWin}
})()

// PLAYER FACTORY - used for making players with unique symbol (x, o, etc.) and playing moves
const player = (symbol) => {

    const playMove = (row, col) => {
        gameBoard.modifyBoard(row, col, symbol)
    }
    return {symbol, playMove}
}