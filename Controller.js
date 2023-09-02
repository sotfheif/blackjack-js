import {Card} from "./Card.js"
import {Suits, Ranks, suitFileName, rankFileName, CARD_DRAW_DURATION_MS, BlackjackTypes, PlayerType} from "./Constants.js"
import { Player } from "./Player.js"
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
      let elRect = document.getElementById("dealer-cards").getBoundingClientRect()
      let left = elRect.left
      let top = elRect.top
      console.log("getdealerplc left =" + left+", top =" + top)

      return {left: left, top: top}
    }
    getPlayerCardPlacePx() {
      let elRect = document.getElementById("player-cards").getBoundingClientRect()
      let left = elRect.left
      let top = elRect.top
      console.log("getplayerplc left =" + left+", top =" + top)
      return {left: left, top: top}
    }
    getDeckPlacePx(){
      let elRect = document.getElementById("deck-img").getBoundingClientRect()
      let left = elRect.left
      let top = elRect.top
      return {left: left, top: top}
    }

    build(){
        return new this()
    }


  move(source, left, top, fill='forwards') {
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
      })
      return anim.finished
  }

    //pass fill = 'none' to return to orig place after animation
  moveAndTurnOver(source, left, top, fill='forwards', card) {
    return this.move(source, left, top, fill).then(
      this.setCardImgSrc.bind(this, source, card))
        

        /*
        const anim = new Animation(
    new KeyframeEffect(source, keyFrames, 
      {
        duration: CARD_DRAW_DURATION_MS,
        fill: fill,
        easing: "ease-in-out",
      })
)
anim.onfinish = () => 
{this.setCardImgSrc.bind(this, source, card)}
anim.play()
return anim
/*
        let anim = source.animate(keyFrames, {
            duration: CARD_DRAW_DURATION_MS,
            fill: fill,
            easing: "ease-in-out",
          })//.finished.then(this.setCardImgSrc.bind(this, source, card))
          // or use //anim.onfinish = () => {console.log("animend")}
          //finished.then(e => { e.effect.target.style.transform = 'rotate(90deg)'; })
          //this.setCardImgSrc.bind(null, source, card)
          */
  }

  moveAndTurnOverCards(sourceAr, leftAr, topAr, fillAr, cardAr){
      let animAr =  prepareMoveAndTurnOverCardsAnimAr(sourceAr, leftAr, topAr, fillAr, cardAr)
      this.chainAnimations(animAr)
    }

  prepareMoveAndTurnOverCardsAnimAr(sourceAr, leftAr, topAr, fillAr, cardAr) {
      let animAr = []
      let i = 0
      while (i<sourceAr.length) {
        const x = leftAr[i] - parseInt(sourceAr[i].style.left)
        const y = topAr[i] - parseInt(sourceAr[i].style.top)
        console.log(`x=${x}, y=${y}`)
        const keyFrames =
        [
            { transform: 'translate(0)' }, 
            { transform: `translate(${x}px, ${y}px)` }
        ]

        const anim = new Animation(
    new KeyframeEffect(sourceAr[i], keyFrames, 
      {
        duration: CARD_DRAW_DURATION_MS,
        fill: fillAr[i],
        easing: "ease-in-out",
      }))
      anim.onfinish = this.setCardImgSrc.bind(this, sourceAr[i], cardAr[i])
      animAr.push(moveAnim)
      i++
    }
    console.log("animAr = "+animAr)
    return animAr
  }

  chainAnimations(animations) {
      const s = animations.reduce((accumulator, currentValue) => {
        return accumulator.then(() => {
            currentValue.play()
            return currentValue.finished
        })
    }, Promise.resolve()).then(
        () => console.log('chainanims done'),
        (e) => {console.log("e="+e)}
    )
  }


    test(){
    //getBoundingClientRect().top
  //getBoundingClientRect().left
  //translate("100px", "50px")
  }

  addCardBackOnDeck(id =""){
    let deckPlace = this.getDeckPlacePx()
    console.log("addCardBackOnDeck left " + deckPlace.left +" top " + deckPlace.top)
    const cardBackImg = this.createCardBack()
    cardBackImg.style.left = deckPlace.left
    cardBackImg.style.top = deckPlace.top
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
    img.setAttribute("class", "card removable")
    return img
  }

  createCardFront(card) {
    let cardFrontImg = this.createCardImg()
    cardFrontImg.setAttribute("src", this.getCardImgPath(card))
    return cardFrontImg
  }

  getCardImgPath(card) {
    console.log("getCardImgPath "+card.suit + " " + card.rank)
    console.log("getCardImgPath "+ suitFileName.get(card.suit) + " " + rankFileName.get(card.rank))

    return `./res/card_images/svg/${suitFileName.get(card.suit)}_${rankFileName.get(card.rank)}.svg`
  }



  setCardImgSrc(el, card){
    console.log("setCardImgSrc "+card.suit + " " + card.rank)
    el.setAttribute("src", this.getCardImgPath(card))
  }
  //el.addEventListener("animationend", function() {})


  drawPlayerCard(card, prevCardCount, playerType, hidden = false){
    console.log("drawPlayerCard "+card.suit + " " + card.rank)
    let cardImgId = `${playerType}-card${prevCardCount}`
    let playerCardPlace
    if (playerType === PlayerType.player){
     playerCardPlace = this.getPlayerCardPlacePx()
    } else if(playerType === PlayerType.dealer) {
      playerCardPlace = this.getDealerCardPlacePx()
    }
    let leftC = playerCardPlace.left + prevCardCount *
     this.neighbourCardOffsetPx
    let topC = playerCardPlace.top
    let el = this.addCardBackOnDeck(cardImgId)
    //this.setCardImgSrc.bind(null, el, card))
    if (hidden) {
      return this.move(el, leftC, topC, "forwards")
    } else {
    return this.moveAndTurnOver(el, leftC, topC, "forwards", card)
    }
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

  startGame(balance, bet, playerHand, dealerHand, blackjackState, newBalance){  
    console.log("playerhand = "+playerHand.cards[0].rank +" "+playerHand.cards[0].suit+', ' + playerHand.cards[1].rank+' '+playerHand.cards[1].suit)
    console.log("dealerhand = "+dealerHand.cards[0].rank +" "+dealerHand.cards[0].suit+', ' + dealerHand.cards[1].rank+' '+dealerHand.cards[1].suit)
    this.hideBetDialog()
    this.updateBalance(balance)
    this.showBet(bet)
    document.getElementById(this.deckImgId).style.visibility = "visible" //deck image
    //this.addCardBackOnDeck(this.topDeckImgId)//img to move around
    this.givePlayerStartHand(playerHand).then(()=> 
    {return this.giveDealerStartHand(dealerHand)}).then(() =>
    this.showHandWorth(playerHand.getWorth(), dealerHand.getWorth(false))
    ).then(() => this.handleBlackJack(blackjackState, newBalance, dealerHand.cards[0], dealerHand.getWorth()))
  }
  
  showHandWorth(playerHandWorth, dealerHandWorth){
    console.log("showHandWorth()")
    let playerWorthEl = document.getElementById("player-worth-text")
    let dealerWorthEl = document.getElementById("dealer-worth-text")
    playerWorthEl.textContent = playerHandWorth
    dealerWorthEl.textContent = dealerHandWorth
  }

  hideBetDialog(){
    document.getElementById("bet-play-gameover").style.visibility = "hidden"
  }

  givePlayerStartHand(playerHand){
    return this.drawPlayerCard(playerHand.cards[0], 0, PlayerType.player)
    .then(() =>this.drawPlayerCard(playerHand.cards[1], 1, PlayerType.player))
  }

  giveDealerStartHand(dealerHand){
    return this.drawPlayerCard(dealerHand.cards[0], 0, PlayerType.dealer, true)
    .then(() =>this.drawPlayerCard(dealerHand.cards[1], 1, PlayerType.dealer))
  }

  dealerMove(dealerHand) {
    /*
    let animAr = prepareMoveAndTurnOverCardsAnimAr(
      sourceAr, leftAr, topAr, fillAr, cardAr)

    let i = 2
    while(i<dealerHand.getSize()){
      this.drawPlayerCard(dealerHand.cards[i], i, PlayerType.dealer)
      i++
    }
    */
   const cards = dealerHand.cards.slice(2)
    const s = cards.reduce((accumulator, card) => {
      let i = 2
      return accumulator.then(() => {
          const prom = this.drawPlayerCard(card, i, PlayerType.dealer)
          this.updateHandWorth(PlayerType.dealer, Card.getCardsWorth(cards.slice(0,i)))
          i++
          return prom
      })
  }, Promise.resolve())
  return s
  }


  handleBlackJack(blackjackState, newBalance, dealerHiddenCard, dealerHandWorth){
    if (blackjackState === BlackjackTypes.nobody) {return}
    this.showDealerHiddenCard(dealerHiddenCard, dealerHandWorth)
    
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

  showDealerHiddenCard(card, handWorth){
    document.getElementById("dealer-card0").src = this.getCardImgPath(card)
    this.updateHandWorth(PlayerType.dealer, handWorth)
  }

  endGame(mess, newBalance){
    this.updateBalance(newBalance)
    document.getElementById("bet-text").textContent = ""
    document.getElementById("gameover-message")
    .textContent = mess
    document.getElementById("bet-play-gameover")
    .style.visibility = "visible"
    document.getElementsByClassName("game")
  }

  updateHandWorth(playerType, handWorth) {
    let id = `${playerType}-worth-text`
    document.getElementById(id).textContent = handWorth
  }
}