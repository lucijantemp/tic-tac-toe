'use strict'

import { DOM } from './scripts/DOM.js'
import { GameBoard } from './scripts/gameboard.js'
import { Settings } from './scripts/settings.js'



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

    // main function of the game that controls everything
    const play = () => {
        // Initialize settings event listeners
        // add settings btn functionality
        DOM.btnSettings.addEventListener("click", Settings.toggleSettings)
        // add reset score settings event listener
        DOM.btnResetScore.addEventListener("click", Settings.resetScore)

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
                        setTimeout(() => DOM.winnerLine.style.opacity = 1, 100)
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