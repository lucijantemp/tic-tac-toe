'use strict'

import {DOM} from './DOM.js'

export const Settings = (() => {

    const toggleSettings = () => {
        switch (getComputedStyle(DOM.settingsContainer).zIndex) {
            case "1":
                DOM.settingsContainer.style.zIndex = "-1"
                break
            case "-1":
                DOM.settingsContainer.style.zIndex = "1"
                break
        }
    }

    const changeTheme = () => {
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

    const resetScore = () => {
        DOM.score0.innerHTML = "_"
        DOM.score1.innerHTML = "_"
    }

    return {toggleSettings, changeTheme, resetScore}
})()