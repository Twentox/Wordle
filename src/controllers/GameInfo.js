"use strict"
import on from "../util/dom"

class GameInfo {
    /**
     * 
     * @param {HTMLDivElement} infoCardContainer 
     */
    constructor(infoCardContainer) {
        this.infoCardContainer = infoCardContainer
    }

    init() {
        on(".fa-circle-info", "click", (event) => {
            const tlInfoButton = new TimelineMax()
            tlInfoButton.fromTo(this.infoCardContainer, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut })
            this.infoCardContainer.style.display = "block"
        })

        on(".info-card-btn", "click", () => {
            const tlBackToGameBtn = new TimelineMax()
            tlBackToGameBtn.to(this.infoCardContainer, 1, { height: "0%" })
            setTimeout(() => {
                getCardContainer.style.display = "none"
            }, 1001);
        })
    }
}


export default GameInfo