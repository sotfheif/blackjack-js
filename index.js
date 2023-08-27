import {Game} from './Game.js'
import {Global} from './Global.js'
import {rules} from './Rules.js'

console.log("index.js start")

const global = Global.build()
let game

let playBtn = document.getElementById("play-btn")
playBtn.addEventListener("click", function(event){
    game = Game.build(rules)
    game.start()
    game.checkBlackjack()
    console.log("game started")
    console.log(game.dealer.hand.getSize() + " " +
    game.dealer.hand.getWorth() + " " + game.player.hand.getSize() +
    " " + game.player.hand.getWorth())
})
