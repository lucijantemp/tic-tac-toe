'use strict'

// DOM module used for selecting DOM nodes and manipulating
const DOM = (() => {
    // container and boxes
    const container = document.querySelector(".container")
    const boxes = () => {
        return document.querySelectorAll(".box")
    }

    // creates and returns box node object
    const createBox = (symbol, position) => {
        let box = document.createElement("button")
        box.innerHTML = symbol
        box.classList.add("box")
        // will be useful when we click the box to know position of it to change on the background board
        box.id = position
        return box
    }

    return  {container, boxes, createBox}
})()



// GAMEBOARD MODULE - used for displaying and manipulating board and checking winner
const GameBoard = (() => {

    const gameboard = [
        ["", "", ""], 
        ["", "", ""], 
        ["", "", ""]
    ]

    const generateBoardDOM = () => {
        // delete old boxes if there are any
        DOM.boxes().forEach(box => box.remove())

        for (let i=0; i<gameboard.length; i++) {
            for (let j=0; j<gameboard[0].length; j++) {
                // create and add box on each iteration
                DOM.container.appendChild(DOM.createBox(gameboard[i][j], `${i}${j}`))

            }
        }
    }

    const clearBoard = () => {
        DOM.boxes().forEach(box => {box.innerHTML = ""})
        for (let i=0; i<gameboard.length; i++) {
            for (let j=0; j<gameboard[0].length; j++) {
                gameboard[i][j] = ""
            }
        }
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
        let diagDescArray = []
        for (let i=0; i<gameboard.length; i++) {
            diagDescArray.push(gameboard[i][i])
        }
        if (diagDescArray.every(val => val === diagDescArray[0])) {
            return diagDescArray[0]
        }
        // second diagonal ( / ) ascending
        let diagAscArray = []
        for (let i=0; i<gameboard.length; i++) {
            diagAscArray.push(gameboard[gameboard.length - i - 1][i])
        }
        if (diagAscArray.every(val => val === diagAscArray[0])) {
            return diagAscArray[0]
        }
        return false
    } 
    // combines above 3 functions together
    const checkWin = () => {
        return (_checkRows() || _checkCols() || _checkDiags())
    }

    // Public API, returning only necesarry props and funcs
    return {gameboard, checkWin, generateBoardDOM, clearBoard}
})()



// GAME MODULE - used for controling flow of the game
const Game = (() => {

    let currentPlayer = 0
    let players = ["x", "o"]

    const changePlayer = () => {
        switch (currentPlayer) {
            case 0:
                currentPlayer = 1
                break
            case 1:
                currentPlayer = 0
                break
        }
    }

    // main function of the game that controls everything
    const play = () => {
        // clear and generate the board
        GameBoard.generateBoardDOM()
        // wait for moves
        DOM.boxes().forEach(box => {
            box.addEventListener("click", () => {
                // check if move is legal
                if (box.innerHTML === "") {
                    // update boards
                    GameBoard.gameboard[box.id[0]][box.id[1]] = players[currentPlayer] // update background board
                    box.innerHTML = players[currentPlayer] // update real board
                    // check if win
                    if (GameBoard.checkWin()) {
                        alert(`${players[currentPlayer]} won!`)
                        GameBoard.clearBoard()
                        currentPlayer = 0
                    } else {
                        changePlayer()
                    }
                } 
            })
        })
    }

    return {play, currentPlayer, players}
})()


Game.play()