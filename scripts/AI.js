'use strict'

import { DOM } from './DOM.js'
import { GameBoard } from './gameboard.js'

export const AI = (() => {

    // BOT 1 - EASY

    // returns list of available coordinates in gameboard
    const _availableBoxes = () => {
        let coordinates = []

        for (let i=0; i<GameBoard.gameboard.length; i++) {
            for (let j=0; j<GameBoard.gameboard[0].length; j++) {
                if (GameBoard.gameboard[i][j] == "") {
                    coordinates.push(`${i}${j}`)
                }
            }
        }
        return coordinates
    }

    // returns a random item from a list - will be used to select random coordinate
    const _chooseRandomCoordinate = (coords) => {
        let min = 0
        let max = coords.length

        return coords[Math.floor(Math.random() * (max - min) + min)]
    }

    // combines above 2 functions and plays a random move on gameboard
    const playMoveEasy = (symbol) => {
        // get a random available coordinate (row and column)
        let coordinate = _chooseRandomCoordinate(_availableBoxes())
        let row = coordinate[0]
        let column = coordinate[1]

        let box = document.getElementById(`${row}${column}`)

        // update boards (background and real)
        GameBoard.gameboard[box.id[0]][box.id[1]] = symbol
        box.innerHTML = symbol
    }

    // BOT 2 - MEDIUM


    

    return {playMoveEasy}
})()