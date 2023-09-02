import {Game} from './Game.js'
import {Global} from './Global.js'
import {rules} from './Rules.js'
import {Controller} from './Controller.js'
import {Card} from './Card.js'
import { BlackjackTypes } from './Constants.js'

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
hitBtn.addEventListener("click", playerHit)

let okBtn = document.getElementById("gameover-ok-btn")

let standBtn = document.getElementById("stand-btn")
standBtn.addEventListener("click", playerStand)



function startGame() {
  document.getElementById("gameover-message").textContent = ""
  Array.prototype.forEach.call(
    document.getElementsByClassName("removable"),
  element => {
    element.remove()
  });
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
  controller.startGame(balance, bet, game.player.hand, game.dealer.hand, blackjackState, newBalance)
    
}

/*
function handleBlackJack(balance) {
}
*/

function playerHit(){
drawPlayerCard()
}

function playerStand(){
  dealerMove(game.dealer).then(() => endGame())
}

function drawPlayerCard(){
  game.drawPlayerCard()
}

function dealerMove(dealer) {
  controller.showDealerHiddenCard(dealer.hand.cards[0], dealer.getHandWorth())
  while(dealer.getHandWorth()<17) {
    dealer.drawCard(game.deck)
  }
  return controller.dealerMove(dealer.hand) 
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
  controller.hideBetDialog()
}

function drawGameUi(){
  controller.drawGameUi()
}

function showDealerHiddenCard(){
}

function endGame(){
  console.log("endGame()")
  const res = game.getResult()
  const newBalance = global.endGame(res.result, game.bet)
  controller.endGame(res.mess, newBalance)
}