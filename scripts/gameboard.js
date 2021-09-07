'use strict'

import {DOM} from './DOM.js'

// GAMEBOARD MODULE - used for displaying and manipulating board and checking winner
export const GameBoard = (() => {

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

    // displays winner line based on win postition
    const displayWinLine = () => {
        // update winner line based on position of win (3 same elements in a row, col or diag)
        DOM.winnerLine.style.display = 'block'
        setTimeout(() => DOM.winnerLine.style.opacity = '1', 100)
        switch (checkWin()[1]) {
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
    }

    // returns true if board is full and nobody won (tie)
    const checkTie = () => {
        return Array.from(DOM.boxes()).every(box => box.innerHTML != "")
    }

    // Public API, returning only necesarry props and funcs
    return {gameboard, checkWin, checkTie, generateBoardDOM, clearBoard, freeze, displayWinLine}
})()