'use strict'

// DOM module used for selecting DOM nodes and manipulating
const DOM = (() => {
    // node elements
    const container = document.querySelector(".container")
    const boxes = () => {
        return document.querySelectorAll(".box")
    }
    const btnRestart = document.querySelector(".btn-restart")
    const msg = document.querySelector(".msg")

    const score0 = document.querySelector(".score0")
    const score1 = document.querySelector(".score1")

    // creates and returns box node object
    const createBox = (symbol, position) => {
        let box = document.createElement("button")
        box.innerHTML = symbol
        box.classList.add("box")
        // will be useful when we click the box to know position of it to change on the background board
        box.id = position
        return box
    }

    return  {container, boxes, msg, score0, score1, createBox, btnRestart}
})()



// GAMEBOARD MODULE - used for displaying and manipulating board and checking winner
const GameBoard = (() => {

    const gameboard = [
        ["", "", ""], 
        ["", "", ""], 
        ["", "", ""]
    ]

    const _removeBorders = () => {
        DOM.boxes().forEach(box => {
            // remove top and bottom borders
            switch (box.id[0]) {
                case "0":
                    box.style.borderTop = "none"
                    break
                case `${gameboard.length-1}`:
                    box.style.borderBottom = "none"
                    break
            }
            switch (box.id[1]) {
                case "0":
                    box.style.borderLeft = "none"
                    break
                case `${gameboard[0].length-1}`:
                    box.style.borderRight = "none"
                    break
            }
        })
    }

    const generateBoardDOM = () => {
        // delete old boxes if there are any
        DOM.boxes().forEach(box => box.remove())

        for (let i=0; i<gameboard.length; i++) {
            for (let j=0; j<gameboard[0].length; j++) {
                // create and add box on each iteration
                DOM.container.appendChild(DOM.createBox(gameboard[i][j], `${i}${j}`))

            }
        }
        _removeBorders()
    }

    const clearBoard = () => {
        DOM.boxes().forEach(box => {box.innerHTML = ""})
        for (let i=0; i<gameboard.length; i++) {
            for (let j=0; j<gameboard[0].length; j++) {
                gameboard[i][j] = ""
            }
        }
    }

    const freeze = () => {
        DOM.boxes().forEach(box => {
            box.disabled = true
        })
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
    // returns true if board is full and nobody won (tie)
    const checkTie = () => {
        return Array.from(DOM.boxes()).every(box => box.innerHTML != "")
    }

    // Public API, returning only necesarry props and funcs
    return {gameboard, checkWin, checkTie, generateBoardDOM, clearBoard, freeze}
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

    // clears both boards, reset current player, clear msg, enable boxes
    const reset = () => {
        GameBoard.clearBoard()
        currentPlayer = 0
        DOM.msg.innerHTML = ""
        DOM.boxes().forEach(box => {
            box.disabled = false
        })
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
                        DOM.msg.innerHTML = `${players[currentPlayer]} won!`
                        GameBoard.freeze()
                        switch (currentPlayer) {
                            case 0:
                                if (DOM.score0.innerHTML == "_") {
                                    DOM.score0.innerHTML = 1
                                } else {
                                    DOM.score0.innerHTML = parseInt(DOM.score0.innerHTML) + 1
                                }
                                break
                            case 1:
                                if (DOM.score1.innerHTML == "_") {
                                    DOM.score1.innerHTML = 1
                                } else {
                                    DOM.score1.innerHTML = parseInt(DOM.score1.innerHTML) + 1
                                }
                        }
                    }
                    // check if tie
                    else if (GameBoard.checkTie()) {
                        DOM.msg.innerHTML = "It's a tie"
                    } 
                    // no win, no tie => change player (game continues)
                    else {
                        changePlayer()
                    }
                } 
            })
        })

        // restart button
        DOM.btnRestart.addEventListener("click", reset)
    }

    return {play, currentPlayer, players}
})()


Game.play()