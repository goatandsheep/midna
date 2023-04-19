
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
        'considerAvoidance': 'I know you\'re working hard, so if this is just a tough work issue, you may benefit from moving on to some other work, taking a step back to look at the bigger picture, asking for help, or pushing through for 5 more minutes. Are you overdue for a break? Maybe you should take this break. If you still want this break, can I set a timer? If so, tell me how many minutes.',
        'factWorkTimers': 'I think you should because this page is engineered to lead you to content relevant to work, but is still avoidance. Also you are already addicted to working too much and going without breaks is bad for your productivity and health.',
        'enjoyBreak': 'Enjoy your break!',
        'enjoyWork': 'Good luck on your work!',
        'errorNumberExpected': 'Error: I don\'t understand the number you\'ve submitted. Please try again.'
    }
}

// check for ongoing timers

const timer = getStorage(MIDNA_TIMER)
let timerVar
const currDate = new Date()
if (timer && timer > currDate.getTime()) {
    restartTimer(timer)
}
const isReflex = window.alert(`${midnaText}: ${i18n[lang]['flaggedSiteWarning']} ${i18n[lang]['catchReminder']} ${i18n[lang]['confirmContinue']}`)

if (window.confirm(`${midnaText}: ${i18n[lang]['isThisWork']}`)) {
    let invalid = true
    let timerTime = ''
    while(invalid) {
        let showError = ''
        if (timerTime) {
            // TODO: show error message
            showError += ('\n' + i18n[lang]['errorNumberExpected'])
        }
        timerTime = window.prompt(`${midnaText}: ${i18n[lang]['doNeedTimer']} ${i18n[lang]['factWorkTimers']}${showError}`)
        if (!timerTime) {
            invalid = false
        }
        if (timerTime && !isNaN(parseInt(timerTime))) {
            createTimer(timerTime)
            invalid = false
        }
    }
} else if(window.confirm(`${midnaText}: ${i18n[lang]['isThisPlanned']} ${i18n[lang]['considerAlt']}`)) {
    // TODO: set timer and enjoy
    window.prompt(`${midnaText}: ${i18n[lang]['doNeedTimer']} ${i18n[lang]['enjoyBreak']}`)
} else {
    // if you are here to avoid work, suggest alertatives
    window.prompt(`${midnaText}: ${i18n[lang]['considerAvoidance']} ${i18n[lang]['doNeedTimer']}`)
    // TODO: set timer?
    // TODO: save timer?
}
/**
 *
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

// clearInterval

/**
 * Notify the user the end of the timer, give a message, ask if they want another timer
 */
function timerEnd() {
    // TODO: how are you? would you like another timer? you probably shouldn't as you are having diminishing returns
    // alternatively if you want to continue resting, consider changing your form of break such as exercise, eating, napping, etc.
}

// abstracted so this script can be used as an extension or a userscript or something else
// TODO: experiment with GM API to understand cross-origin timers
function getStorage(index) {
    // return GM_getValue(index)
    return window.localStorage.getItem(index)
}
function setStorage(index, value) {
    // GM_setValue(index, value)
    window.localStorage.setItem(index, value)
}
function clearStorage(index) {
    // GM_deleteValue(index)
    window.localStorage.removeItem(index)
}
