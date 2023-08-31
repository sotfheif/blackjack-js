import {Card} from "./Card.js"
import {Suits, Ranks, suitFileName, rankFileName, CARD_DRAW_DURATION_MS} from "./Constants.js"

export class Controller {
    constructor(){

    }
    neighbourCardOffsetPx = 30
    cardWidthPx = 100
    dealerCardPlacePx = {left: 100, top: 20}
    playerCardPlacePx = {left: 100, top: 200}
    deckPlacePx = {left:800, top:110}
    deckImgId = "deck-card-back"
    topDeckImgId = "top-deck-card-back"

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



  setBalance(){

  }

  showBettingScreen(){
    clearGameUi()
    showBetDialog()

  }

  startGame(){
    const dealerCardsDiv = document.getElementById("dealer-cards")

    hideBetDialog()
    showBet()
    this.addCardBackOnDeck(this.deckImgId) //deck image
    //this.addCardBackOnDeck(this.topDeckImgId)//img to move around
    givePlayerStartHand()
    giveDealerStartHand()
    showHandWorth()

    //dealerCardsDiv.appendChild(dealerCard1)
  }
  givePlayerStartHand(){
    
  }
  giveDealerStartHand(){

  }
}
