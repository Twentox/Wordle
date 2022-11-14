"use strict"
import on from "../util/dom"
const resultCard = require("../template/resultCard.ejs")
class Game {
    /**
     * 
     * @param {string} word 
     * @param {string} secretWord 
     * @param {HTMLDivElement} woorldeContainer
     * @param {HTMLDivElement} resultContainer
     * 
     */
    constructor(woorldeContainer, resultContainer, rows) {
        this.rows = rows
        this.woorldeContainer = woorldeContainer
        this.resultContainer = resultContainer
        this.result = []
        this.counter = 0
        this.rowStart = 0
        this.word = []
        this.secretWord = this.randomSecretWord()
        this.scaleAnimation = {
            scaleUp: [
                { transform: "scale(1)" },
                { transform: "scale(1.2)" },
                { transform: "scale(1)" }
            ],
            scaleUpTiming: {
                duration: 400,
                iteration: 1,
            }
        }
    }
    init() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && this.word.length > 0) {
                this.popElement()
            }

            if (this.onlyLetters(event) && this.word.length < 5) {
                this.pushElement(event.key)
            }

            if (event.key === "Enter" && this.word.length === 5) {
                this.check()
                this.colorChange()
                this.checkForWinner()
                this.result = []
                this.word = []
                this.rowStart++
                this.counter = 0
            }
        })

        on(".result-btn", "click", (event) => {
            this.resultContainer.style.display = "none"
            this.clearField()
            this.rowStart = 0
            this.word = []
            this.secretWord = this.randomSecretWord()
        })

        on(".result-container", "click", () => {
            this.resultContainer.style.display = "none"
        })
    }


    popElement() {
        this.word.pop()
        this.rows[this.rowStart].children[this.counter - 1].innerText = ""
        this.counter--
    }
    pushElement(letter) {
        this.word.push(letter)
        this.rows[this.rowStart].children[this.counter]
            .innerText = letter
        this.rows[this.rowStart].children[this.counter]
            .animate(
                this.scaleAnimation.scaleUp,
                this.scaleAnimation.scaleUpTiming
            )
        this.counter++

    }

    onlyLetters(event) {
        if (event.which <= 90 && event.which >= 48) {
            return true
        }
        else return false
    }


    check() {
        let secretWordCopy = [...this.secretWord]
        let wordCopy = this.word.join("").toLowerCase()
        wordCopy = [...wordCopy]
        for (let i = 0; i < secretWordCopy.length; i++) {
            let index = secretWordCopy.indexOf(wordCopy[i])
            if (secretWordCopy[i] === wordCopy[i]) {
                this.result.push("green")
                secretWordCopy[i] = "0"
                wordCopy[i] = "0"
            }
            else if (index !== -1 && secretWordCopy[index] !== wordCopy[index]) {
                this.result.push("orange")
                secretWordCopy[index] = "0"
                wordCopy[i] = "0"
            }
            else {
                this.result.push("red")
                wordCopy[i] = "0"
            }

        }
        return this.result

    }

    checkForWinner() {
        this.secretWord = [...this.secretWord]
        if (JSON.stringify(this.secretWord) === JSON.stringify(this.word) || this.rowStart === 4) {
            const htmlDocument = resultCard({
                word: this.secretWord.join("")
            })
            this.resultContainer.insertAdjacentHTML("beforeend", htmlDocument)
            this.resultContainer.style.display = "block"
        }
    }


    colorChange() {
        for (const i in this.result) {
            if (this.result[i] === "green") {
                this.woorldeContainer.children[this.rowStart].children[i].classList.add("background-color-green")
            }
            else if (this.result[i] === "orange") {
                this.woorldeContainer.children[this.rowStart].children[i].classList.add("background-color-orange")
            }

            else {
                this.woorldeContainer.children[this.rowStart].children[i].classList.add("background-color-red")
            }
        }
    }



    randomSecretWord() {
        const wordList = [
            "eimer", "eiche", "dolch", , "datei", "dampf", "busch",
            "bohle", "bluse", "blech", "biene", "aroma", "ampel", "alarm", "enkel",
            "engel", "erbse", "essig", "fahne", "falle", "falke", "falte",
            "fiber", "fluch", "fuchs", "gabel", "gouda", "gebet", "geist", "getto",
            "gummi", "hagel", "hecht", "honig", "jacke"
        ]
        let random = Math.floor(Math.random() * wordList.length)
        return wordList[random]
    }


    clearField() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.woorldeContainer.children[i].children[j].innerText = ""
                this.woorldeContainer.children[i].children[j].classList.remove("background-color-red")
                this.woorldeContainer.children[i].children[j].classList.remove("background-color-orange")
                this.woorldeContainer.children[i].children[j].classList.remove("background-color-green")
            }
        }
    }
}

export default Game