
'use strict';
const lang = 'en'
const midnaText = 'Midna'
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

console.log('midna');
// window.alert()
// window.close()
// window.confirm()
// window.prompt()
// check for ongoing timers
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
    // timer and enjoy
    window.prompt(`${midnaText}: ${i18n[lang]['doNeedTimer']} ${i18n[lang]['enjoyBreak']}`)
} else {
    // if you are here to avoid work, suggest alertatives
    window.prompt(`${midnaText}: ${i18n[lang]['considerAvoidance']} ${i18n[lang]['doNeedTimer']}`)
    // set timer?
}
/**
 * 
 * @param {Number} time in minutes
 */
function createTimer(time) {
    console.log(time)
}

/**
 * @param {String} timestamp of end of timer
 */
function restartTimer(timestamp) {
    //
}