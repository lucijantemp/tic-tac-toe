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

    const resetScore = () => {
        DOM.score0.innerHTML = "_"
        DOM.score1.innerHTML = "_"
    }

    return {toggleSettings, resetScore}
})()