'use strict'

// DOM module used for selecting DOM nodes and manipulating
export const DOM = (() => {
    // relevant node elements
    const container = document.querySelector(".container")
    const boxes = () => {
        return document.querySelectorAll(".box")
    }
    const btnRestart = document.querySelector(".btn-restart")
    const msg = document.querySelector(".msg")

    const score0 = document.querySelector(".score0")
    const score1 = document.querySelector(".score1")

    const winnerLine = document.querySelector(".winner-line")

    const btnSettings = document.querySelector(".btn-settings")
    const settingsContainer = document.querySelector(".settings-container")
    const cboxChangeTheme = document.querySelector(".checkbox-change-theme")
    const cboxBot = document.querySelector(".bot")
    const btnDifficulty = document.querySelector(".btn-difficulty")
    const btnResetScore = document.querySelector(".btn-reset-score")

    // creates and returns box node object
    const createBox = (symbol, position) => {
        let box = document.createElement("button")
        box.innerHTML = symbol
        box.classList.add("box")
        // will be useful in many cases
        box.id = position
        return box
    }

    return  {container, boxes, msg, score0, score1, winnerLine, btnSettings, settingsContainer, cboxChangeTheme, 
            cboxBot, btnDifficulty, btnResetScore, createBox, btnRestart}
})()

