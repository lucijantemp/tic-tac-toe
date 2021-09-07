'use strict'

import {DOM} from './DOM.js'



export const Settings = (() => {

    let mode // default, bot
    let botDifficulty // easy, medium, hard
    let levels = ["easy", "medium", "hard"]


    const _toggleSettings = () => {
        switch (getComputedStyle(DOM.settingsContainer).zIndex) {
            case "1":
                DOM.settingsContainer.style.zIndex = "-1"
                break
            case "-1":
                DOM.settingsContainer.style.zIndex = "1"
                break
        }
    }

    const _setTheme = () => {
        if (DOM.cboxChangeTheme.checked == true) {
            // add 'dark' class name to specific elements
            document.querySelector("body").classList.add("dark")
            document.querySelector(".container-bg").classList.add("dark")
            DOM.boxes().forEach(box => box.classList.add("dark"))
            document.querySelector(".btn-restart").classList.add("dark")
            document.querySelector(".winner-line").classList.add("dark")
            document.querySelector(".settings-container").classList.add("dark")
            document.querySelector(".LDZoid").classList.add("dark")
            document.querySelector(".btn-difficulty").classList.add("dark")
        } else {
            // remove 'dark' class name to specific elements
            document.querySelector("body").classList.remove("dark")
            document.querySelector(".container-bg").classList.remove("dark")
            DOM.boxes().forEach(box => box.classList.remove("dark"))
            document.querySelector(".btn-restart").classList.remove("dark")
            document.querySelector(".winner-line").classList.remove("dark")
            document.querySelector(".settings-container").classList.remove("dark")
            document.querySelector(".LDZoid").classList.remove("dark")
            document.querySelector(".btn-difficulty").classList.remove("dark")
        }
    }

    const _setMode = () => {
        if (DOM.cboxBot.checked == true) {
            Settings.mode  = "bot"
        } else {
            Settings.mode = "default"
        }
    }

    const _changeDifficulty = () => {
        switch (DOM.btnDifficulty.innerHTML) {
            case "EASY":
                DOM.btnDifficulty.innerHTML = "MEDIUM"
                break
            case "MEDIUM":
                DOM.btnDifficulty.innerHTML = "HARD"
                break
            case "HARD":
                DOM.btnDifficulty.innerHTML = "EASY"
                break
        }
        _setDifficulty()
    }

    const _setDifficulty = () => {
        switch (DOM.btnDifficulty.innerHTML) {
            case "EASY":
                Settings.botDifficulty = "easy"
                break
            case "MEDIUM":
                Settings.botDifficulty = "medium"
                break
            case "HARD":
                Settings.botDifficulty = "hard"
                break
        }
    }

    const _resetScore = () => {
        DOM.score0.innerHTML = "_"
        DOM.score1.innerHTML = "_"
    }

    // main Settings function - initializes all settings functionalities
    const init = () => {
        // settings btn functionality
        DOM.btnSettings.addEventListener("click", _toggleSettings)
        // sets a theme and init btn for changing theme
        _setTheme()
        DOM.cboxChangeTheme.addEventListener("change", _setTheme)
        // sets a mode for gameplay (default or bot)
        _setMode()
        DOM.cboxBot.addEventListener("change", _setMode)
        // sets a difficulty which can be changed by player
        _setDifficulty
        DOM.btnDifficulty.addEventListener("click", _changeDifficulty)
        // init a btn for reseting score
        DOM.btnResetScore.addEventListener("click", _resetScore)
    }

    return {init, mode}
})()