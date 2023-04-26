// ==UserScript==
// @name         Midna
// @version      0.1
// @description  Browser companion to take control of breaks
// @author       Kemal Ahmed <goatandsheep@gmail.com>
// @match        *
// ==/UserScript==


(function() {
    'use strict';
    const lang = 'en'
    const midnaText = 'Midna'
    const localStorageName = 'MIDNA_TIMER'
    const i18n = {
        'en': {
            'flaggedSiteWarning': 'You told me to flag this site.',
            'catchReminder': 'Did you come here as a reflex to avoid work?',
            'confirmContinue': 'If you didn\'t intend to, I recommend you close the page and I\'ll see you later.',
            'isAvoidance': 'Are you here to avoid work?',
            'isThisPlanned': 'Say OK if this a planned break or Cancel if you are here to avoid work (no judgey!).',
            'isThisWork': 'Are you here for work? If ya, say OK, otherwise say Cancel.',
            'doNeedTimer': 'Can I set a timer for you? If yes, how many minutes? If not, press Cancel.',
            'considerAlt': 'Also I\'m worried you didn\'t consider taking an off-screen break.',
            'considerAvoidance': 'I know you\'re working hard, so if this is just a tough work issue, consider moving on to some other work, taking a step back to look at the bigger picture, asking for help, or pushing through for 5 more minutes. Also consider if you\'re overdue for a break. Maybe you should take this break. Will you cancel this break?',
            'factWorkTimers': 'I think you should because this page is engineered to lead you to content relevant to work, but is still avoidance. Also you are already addicted to working too much and going without breaks is bad for your productivity and health.',
            'enjoyBreak': 'Enjoy your break!',
            'enjoyWork': 'Good luck on your work!',
            'errorNumberExpected': 'Error: I don\'t understand the number you\'ve submitted. Please try again.'
        }
    }

    // check for ongoing timers

    const timer = getStorage(localStorageName)
    let timerVar
    const currDate = new Date()
    if (timer && timer > currDate.getTime()) {
        restartTimer(timer)
    }
    const isReflex = window.alert(`${midnaText}: ${i18n[lang]['flaggedSiteWarning']} ${i18n[lang]['catchReminder']} ${i18n[lang]['confirmContinue']}`)

    if (window.confirm(`${midnaText}: ${i18n[lang]['isThisWork']}`)) {
        // this is work
        timerLoop('factWorkTimers')
    } else if(window.confirm(`${midnaText}: ${i18n[lang]['isThisPlanned']} ${i18n[lang]['considerAlt']}`)) {
        // set timer and enjoy planned break
        timerLoop('enjoyBreak')
    } else if(window.confirm(`${midnaText}: ${i18n[lang]['considerAvoidance']}`)) {
        // if you are here to avoid work, it suggests alternatives or you go back
        history.back()
    } else {
        // set unplanned break timer
        timerLoop('enjoyBreak')
    }

    /**
     *
     * @param {String} messageKey prompt
     */
    function timerLoop(messageKey) {
        let invalid = true
        let timerTime = ''
        while(invalid) {
            let showError = ''
            if (timerTime) {
                // show error message
                showError += ('\n' + i18n[lang]['errorNumberExpected'])
            }
            timerTime = window.prompt(`${midnaText}: ${i18n[lang]['doNeedTimer']} ${i18n[lang][messageKey]}${showError}`)
            if (!timerTime) {
                // you don't want a timer
                invalid = false
            }
            if (timerTime && !isNaN(parseInt(timerTime))) {
                // create timer
                createTimer(timerTime)
                invalid = false
            }
        }
    }

    /**
     * @param {Number} time in minutes
     */
    function createTimer(time) {
        console.log(time)
        setStorage(localStorageName, ((new Date()).getTime() + time * 60000))
    }

    /**
     * After page reload
     * @param {String} timestamp of end of timer
     */
    function restartTimer(timestamp) {
        console.log('restarting timer')
        const currDate = new Date().getTime()
        const duration = timestamp - currDate
        if (duration > 0) {
            timerVar = setTimeout(timerEnd, duration)
        } else {
            clearStorage(localStorageName)
        }
    }

    /**
     * Notify the user the end of the timer, give a message, ask if they want another timer
     */
    function timerEnd() {
        if (window.confirm(`${midnaText}: You asked me to set a timer until now so you can maintain control of your schedule. I hope your break was relaxing! You probably shouldn\'t continue your break as your break returns are diminished. If you want to continue resting, consider changing your form of break such as exercise, eating, napping, etc. Are you going to continue your break?`)) {
            timerLoop('considerAlt')
        }
    }

    // abstracted so this script can be used as an extension or a userscript or something else
    // TODO: experiment with GM API to understand cross-origin timers
    function getStorage(index) {
        // return GM_getValue(index)
        return window.localStorage['index']
    }
    function setStorage(index, value) {
        // GM_setValue(index, value)
        window.localStorage.setItem(index, value)
    }
    function clearStorage(index) {
        // GM_deleteValue(index)
        window.localStorage.removeItem(index)
    }

})();
