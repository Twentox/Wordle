"use strict"

/**
 * 
 * @param {HTMLElement} selector 
 * @param {string} eventTyp 
 * @param {function} cb 
 * 
 */
function on(selector, eventTyp, cb) {
    addEventListener(eventTyp, (event) => {
        let element = event.target
        if (element.matches(selector)) {
            return cb({
                handleObj: element,
                originalEvent: event
            })
        }
        element = element.parentElement
    })
}

export default on