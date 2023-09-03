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
  console.log("clas  len" + document.getElementsByClassName("removable").length)
  removeElementsByClass("removable")
  document.getElementById("player-worth-text").textContent = ""
  document.getElementById("dealer-worth-text").textContent = ""

  let betText = betInput.value //assert or make sure it's number
  let bet = parseInt(betText) 
  console.log('betText=' + betText + ' bet='+bet)
  global.placeBet(bet) 
  game.start(bet)
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
    console.log(`dealer worth ${dealer.getHandWorth()}, need to draw more`)
    dealer.drawCard(game.deck)
  }
  console.log(`dealer worth ${dealer.getHandWorth()}, is enough`)
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
  console.log("clas  len" + document.getElementsByClassName("removable").length)
  removeElementsByClass("removable")
}


function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}



function drawGameUi(){
  controller.drawGameUi()
}

function showDealerHiddenCard(){
}

function endGame(){
  console.log("index.js endGame game.bet ="+ game.bet)
  const res = game.getResult()
  const newBalance = global.endGame(res.result, game.bet)
  console.log("endGame(), newBalance ="+newBalance)
  controller.endGame(res.mess, newBalance)
}