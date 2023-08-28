import {Game} from './Game.js'
import {Global} from './Global.js'
import {rules} from './Rules.js'

console.log("index.js start")

/*
var millisecondsToWait = 5000;
setTimeout(function() {
}, millisecondsToWait);
*/

let state
const global = Global.build()
let betText = document.getElementById("bet-text?")


let game = Game.build(rules)

let playBtn = document.getElementById("play-btn")
playBtn.addEventListener("click", startGame)

let hitBtn = document.getElementById("hit-btn")
hitBtn.addEventListener("click", drawPlayerCard)

let standBtn = document.getElementById("stand-btn")
standBtn.addEventListener("click", dealerMove)



function startGame() {
  let bet = betText //assert or make sure it's number
  global.money = global.money - bet
  game.start()
  isBlackJack(game)
  console.log("game started")
  console.log(game.dealer.hand.getSize() + " " +
    game.dealer.hand.getWorth() + " " + game.player.hand.getSize() +
    " " + game.player.hand.getWorth())
    drawGameUi()
}

function isBlackJack() {
  const blackjack = game.checkBlackjack()
  switch(blackjack) {
    case 0:
      break
    case 1:
      break
    case 2:
      break
    default:
  }
}

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

function playerWin(global, bet, isBlackjack) {
  let prize = bet
  if(isBlackJack) {
    prize = Math.round(prize * 1.5)
  }
  global.money = global.money + prize
}

function drawGameUi(){
    const dealerCardsDiv = document.getElementById("dealer-cards")
    let dealerCard1 = document.createElement("img") 
    dealerCard1.src = "./res/card_images/svg/back.svg"
    dealerCardsDiv.appendChild(dealerCard1)
}