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

    const winnerLine = document.querySelector(".winner-line")

    // creates and returns box node object
    const createBox = (symbol, position) => {
        let box = document.createElement("button")
        box.innerHTML = symbol
        box.classList.add("box")
        // will be useful when we click the box to know position of it to change on the background board
        box.id = position
        return box
    }

    return  {container, boxes, msg, score0, score1, winnerLine, createBox, btnRestart}
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
            // remove left and right borders
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
            let rowNumber = i // used to indicate which row is winner, which will modify winner line
            if (row[0] && row.every(val => val === row[0])) {
                return [row[0], `row-${rowNumber}`]
            }
        } 
        return false
    }
    // checks columns for winner
    const _checkCols = () => {
        for (let i=0; i<gameboard[0].length; i++) {
            let column = []
            let columnNumber = i // used to indicate which column is winner, which will modify winner line
            for (let j=0; j<gameboard.length; j++) {
                column.push(gameboard[j][i])
            }
            if (column[0] && column.every(val => val === column[0])) {

                return [column[0], `column-${columnNumber}`] 
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
        if (diagDescArray[0] && diagDescArray.every(val => val === diagDescArray[0])) {
            return [diagDescArray[0], 'diagonal-desc']
        }
        // second diagonal ( / ) ascending
        let diagAscArray = []
        for (let i=0; i<gameboard.length; i++) {
            diagAscArray.push(gameboard[gameboard.length - i - 1][i])
        }
        if (diagAscArray[0] && diagAscArray.every(val => val === diagAscArray[0])) {
            return [diagAscArray[0], 'diagonal-asc']
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
        // reset winner line position
        DOM.winnerLine.style.top = "50%"
        DOM.winnerLine.style.display = "none"
        DOM.winnerLine.style.transform = "none"
        DOM.winnerLine.style.left = "0"
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
                        // update winner line based on position of win (3 same elements in a row, col or diag)
                        DOM.winnerLine.style.display = 'block'
                        switch (GameBoard.checkWin()[1]) {
                            case 'row-0':
                                DOM.winnerLine.style.top = '16.667%'
                                break
                            case 'row-1':
                                DOM.winnerLine.style.top = '50%'
                                break
                            case 'row-2':
                                DOM.winnerLine.style.top = '83.333%'
                                break    
                            case 'column-0':
                                DOM.winnerLine.style.transform = 'rotate(90deg)'
                                DOM.winnerLine.style.left = '-33.333%'
                                break
                            case 'column-1':
                                DOM.winnerLine.style.transform = 'rotate(90deg)'
                                DOM.winnerLine.style.left = '0'
                                break
                            case 'column-2':
                                DOM.winnerLine.style.transform = 'rotate(90deg)'
                                DOM.winnerLine.style.left = '33.333%'
                                break
                            case 'diagonal-asc':
                                DOM.winnerLine.style.transform = 'rotate(135deg)'
                                break
                            case 'diagonal-desc':
                                DOM.winnerLine.style.transform = 'rotate(45deg)'
                                break
                        }
                        // display message (who won or tie)
                        DOM.msg.innerHTML = `<span class='msg-capital'>${players[currentPlayer]}</span> won!`
                        // freeze gameboard (not allow any clicks before game is restarted)
                        GameBoard.freeze()
                        // update score
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
                        GameBoard.freeze()
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