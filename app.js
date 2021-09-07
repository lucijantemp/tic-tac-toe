'use strict'

import { DOM } from './scripts/DOM.js'
import { GameBoard } from './scripts/gameboard.js'
import { Settings } from './scripts/settings.js'
import { AI } from './scripts/AI.js'



// GAME MODULE - used for controling flow of the game
const Game = (() => {

    let currentPlayer = 0
    let players = ["x", "o"]

    const _changePlayer = () => {
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
    const _reset = () => {
        GameBoard.clearBoard()
        currentPlayer = 0
        DOM.msg.innerHTML = "Good luck!"
        DOM.boxes().forEach(box => {
            box.disabled = false
        })
        // reset winner line position
        DOM.winnerLine.style.top = "50%"
        DOM.winnerLine.style.display = "none"
        DOM.winnerLine.style.transform = "none"
        DOM.winnerLine.style.left = "0"
        DOM.winnerLine.style.opacity = "0"

    }

    // function that checks win or tie and handles it, if no win just changes player (symbol)
    const _check = () => {
        // handle win
        if (GameBoard.checkWin()) {
            // update winner line
            GameBoard.displayWinLine()
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
            return "win"
        }
        // handle tie
        else if (GameBoard.checkTie()) {
            DOM.msg.innerHTML = "It's a tie"
            GameBoard.freeze()
            return "tie"
        } 
        // no win, no tie => change player (game continues)
        else {
            _changePlayer()
            return "none"
        }
    }


    // function that executes when page is opened (sets up everything, add DOM elements, initialize settings functionalities)
    const setup  = () => {
        // generate board
        GameBoard.generateBoardDOM()
        // initialize settings (settings button, theme, mode...)
        Settings.init()

    }


    // function that keeps running (game logic)
    const play = () => {
        // main game logic
        DOM.boxes().forEach(box => {
            box.addEventListener("click", () => {
                // check if move is legal
                if (box.innerHTML === "") {
                    
                    // update boards (background and real)
                    GameBoard.gameboard[box.id[0]][box.id[1]] = players[currentPlayer] 
                    box.innerHTML = players[currentPlayer]

                    // if bot mode is on... it's bot's turn to play
                    if (Settings.mode == "bot") {
                        // if there are empty boxes on the board...
                        if (_check() == "none") {
                            // handle different difficulties
                            switch (DOM.btnDifficulty.innerHTML) {
                                case "EASY":
                                    //play easy move
                                    AI.playMoveEasy(players[currentPlayer])
                                    break
                                case "MEDIUM":
                                    // play medium move
                                    alert("medium is not developed yet")
                                    break
                                case "HARD":
                                    // play hard move
                                    alert("hard is not developed yet")
                                    break
                            }
                            // check win or tie or change player
                            _check()
                        }
                    } else {
                        _check()
                    }
                } 
            })
        })

        // restart button
        DOM.btnRestart.addEventListener("click", _reset)
    }

    return {setup, play}
})()

Game.setup()
Game.play()