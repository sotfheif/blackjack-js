import {Game} from './Game.js'
import {Global} from './Global.js'
import {rules} from './Rules.js'
import {Controller} from './Controller.js'
import {Card} from './Card.js'

console.log("index.js start")

/*
var millisecondsToWait = 5000;
setTimeout(function() {
}, millisecondsToWait);
*/

let state
const global = Global.build()
const controller = new Controller()
let betInput = document.getElementById("bet-input")


let game = Game.build(rules)

let playBtn = document.getElementById("play-btn")
playBtn.addEventListener("click", startGame)

let hitBtn = document.getElementById("hit-btn")
hitBtn.addEventListener("click", drawPlayerCard)

let okBtn = document.getElementById("gameover-ok-btn")

let standBtn = document.getElementById("stand-btn")
standBtn.addEventListener("click", dealerMove)



function startGame() {
  let betText = betInput.value //assert or make sure it's number
  let bet = parseInt(betText) 
  console.log('betText=' + betText + ' bet='+bet)
  global.placeBet(bet) 
  game.start()
  console.log("game started")
  console.log(game.dealer.hand.getSize() + " " +
    game.dealer.hand.getWorth() + " " + game.player.hand.getSize() +
    " " + game.player.hand.getWorth())
    let balance = global.money
    const blackjackState = game.checkBlackjack()
    let newBalance = global.handleBlackJack(blackjackState, bet)
    controller.startGame(balance, bet, blackjackState, newBalance)
    
}

/*
function handleBlackJack(balance) {
}
*/

function drawPlayerCard(){
  game.drawPlayerCard()
}

function dealerMove() {
  //showDealerHiddenCard()
  while(dealer.handWorth()<17) {
    dealer.drawCard()
  }
  if (dealer.handWorth()>21) {
    //dealer overdraft, player win
  } else if (dealer.handWorth>player.handWorth) {
    //dealer more worth, dealer win
  } else if (dealer.handWorth<player.handWorth) {
    //player more worth, player win
  } else {// even score
    //draw, nobody win
  }
}

function isGameOver() {
  
}

function gameOver() {// mb place this inside listener
  //clearGameUi
}

function playerWin(global, bet) {
  global.win(bet)
}

document.getElementById("test-btn").addEventListener("click", test)
function test() {
  console.log(document.getElementById("deck-img").height)
  controller.drawPlayerCard(Card.build(0,4), 0)
  controller.drawPlayerCard(Card.build(2,10), 1)
}

function drawGameUi(){
  controller.drawGameUi()
}