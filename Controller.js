import {Card} from "./Card.js"
import {Suits, Ranks, suitFileName, rankFileName, CARD_DRAW_DURATION_MS, BlackjackTypes} from "./Constants.js"

export class Controller {
    constructor(){

    }
    neighbourCardOffsetPx = 30
    cardWidthPx = 100
    dealerCardPlacePx = {left: 100, top: 20}
    playerCardPlacePx = {left: 100, top: 200}
    deckPlacePx = {left:800, top:110}
    deckImgId = "deck-img"
    balanceTextId = "balance-text"
    gameoverMessId = "gameover-message"

    getDealerCardPlacePx() {
      let left = document.getElementById("dealer-worth").style.right
      let top = document.getElementById("dealer-zone").style.top
      return {left: left, top: top}
    }
    getPlayerCardPlacePx() {
      let left = document.getElementById("player-worth").style.right
      let top = document.getElementById("player-zone").style.top
      return {left: left, top: top}
    }
    getDeckPlacePx(){
      let left = document.getElementById("deck-img").style.left
      let top = document.getElementById("deck-img").style.top
      return {left: left, top: top}
    }

    build(){
        return new this()
    }


    //pass fill = 'none' to return to orig place after animation
    moveAndTurnOver(source, left, top, fill='forwards', card) {
      console.log("source.style.left= " + parseInt(source.style.left) +", source.style.top=" + parseInt(source.style.top))

        const x = left - parseInt(source.style.left)
        const y = top - parseInt(source.style.top)

        const keyFrames =
        [
            { transform: 'translate(0)' }, 
            { transform: `translate(${x}px, ${y}px)` }
        ]

        let anim = source.animate(keyFrames, {
            duration: CARD_DRAW_DURATION_MS,
            fill: fill,
            easing: "ease-in-out",
          }).finished.then(this.setCardImgSrc.bind(this, source, card))
          // or use //anim.onfinish = () => {console.log("animend")}
          //finished.then(e => { e.effect.target.style.transform = 'rotate(90deg)'; })
          //this.setCardImgSrc.bind(null, source, card)
    }

    test(){
    //getBoundingClientRect().top
  //getBoundingClientRect().left
  //translate("100px", "50px")

  }

  addCardBackOnDeck(id =""){
    console.log("addCardBackOnDeck left " + this.deckPlacePx.left +" top " + this.deckPlacePx.top)
    const cardBackImg = this.createCardBack()
    cardBackImg.style.left = this.deckPlacePx.left
    cardBackImg.style.top = this.deckPlacePx.top
    if (id!=""){cardBackImg.setAttribute("id", id)}
    document.body.append(cardBackImg)
    return document.getElementById(id)
  }

  addCardFrontImg(card, left, top){
    let cardFrontImg = this.createCardFront(card)
  }

  createCardBack(){
    const cardBackImg = this.createCardImg()
    cardBackImg.src = "./res/card_images/svg/back.svg"
    return cardBackImg
  }

  createCardImg(){
    const img = document.createElement("img")
    img.style.position = "absolute"
    img.setAttribute("class", "card")
    return img
  }

  createCardFront(card){
    let cardFrontImg = this.createCardImg()
    cardFrontImg.setAttribute("src", this.getCardImgPath(card))
    return cardFrontImg
  }

  getCardImgPath(card){
    console.log("getCardImgPath "+card.suit + " " + card.rank)
    console.log("getCardImgPath "+ suitFileName.get(card.suit) + " " + rankFileName.get(card.rank))

    return `./res/card_images/svg/${suitFileName.get(card.suit)}_${rankFileName.get(card.rank)}.svg`
  }



  setCardImgSrc(el, card){
    console.log("setCardImgSrc "+card.suit + " " + card.rank)
    el.setAttribute("src", this.getCardImgPath(card))
  }
  //el.addEventListener("animationend", function() {})


  drawPlayerCard(card, prevCardCount){
    console.log("drawPlayerCard "+card.suit + " " + card.rank)
    let cardImgId = `player-card${prevCardCount}`
    let leftC = this.playerCardPlacePx.left + prevCardCount *
     this.neighbourCardOffsetPx
    let topC = this.playerCardPlacePx.top
    let el = this.addCardBackOnDeck(cardImgId)
    //this.setCardImgSrc.bind(null, el, card))
    this.moveAndTurnOver(el, leftC, topC, "forwards", card)
  }

  t2(){console.log("animend")}

  buildSetCardImgSrc(el, card){
    return this.setCardImgSrc(el, card)
  }

  drawDealerCard(card){

  }


  showBettingScreen(){
    this.clearGameUi()
    this.showBetDialog()

  }

  showBet(bet) {
    const betEl = document.getElementById("bet-text")
    betEl.textContent = "Bet: " + bet
    betEl.style.visibility="visible"
  }

  updateShowUiText(elemId, text){
    const elem = document.getElementById(elemId)
    elem.textContent = text
    elem.style.visibility = "visible"
  }

  updateBalance(balance){
     const text = "Balance: "+ balance
     this.updateShowUiText(this.balanceTextId,text) 
    }

  startGame(balance, bet, blackjackState, newBalance){
    const dealerCardsDiv = document.getElementById("dealer-cards")
  
    this.hideBetDialog()
    this.updateBalance(balance)
    this.showBet(bet)
    document.getElementById(this.deckImgId).style.visibility = "visible" //deck image
    //this.addCardBackOnDeck(this.topDeckImgId)//img to move around
    this.givePlayerStartHand()
    this.giveDealerStartHand()
    this.showHandWorth()
    //in the end, after all animations, call handleBlackJack(blackjackState, newBalance)

    //dealerCardsDiv.appendChild(dealerCard1)
  }

  hideBetDialog(){
    document.getElementById("bet-play-gameover").style.visibility = "hidden"
  }

  givePlayerStartHand(){
    
  }
  giveDealerStartHand(){

  }

  handleBlackJack(blackjackState, newBalance){
    if (blackjackState === BlackjackTypes.nobody) {return}
    let mess 
    switch(blackjackState){
      case BlackjackTypes.player:
        mess = "Blackjack! You win"
        break
      case BlackjackTypes.dealer:
        mess = "Dealer blackjack! You lose"
        break
      case BlackjackTypes.both:
        mess = "Double blackjack! Draw"
        break
      default:
    }
    this.updateShowUiText(this.gameoverMessId, mess)
    this.updateBalance(newBalance)
  }
}