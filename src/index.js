"use strict"
import "./sass/index.scss"
import Game from "./controllers/Game"
import GameInfo from "./controllers/GameInfo"

const woordle = new Game(
    document.getElementById("woordle-container"),
    document.getElementById("result-container"),
    document.querySelectorAll(".woordle-row"),
)
const woordleInfo = new GameInfo(document.getElementById("info-card-container"))

woordle.init()
woordleInfo.init()




