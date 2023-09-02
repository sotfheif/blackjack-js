import {Player} from "./Player.js"
import {Deck} from "./Deck.js"
import {BlackjackTypes, GameResult} from "./Constants.js"

export class Game{
    constructor(rules) {
        this.rules = rules
    }
    player
    dealer
    deck
    bet
    
    static build(rules) {
        return new this(rules)
    }
    start(bet){
        this.bet = bet
        this.player = Player.build(false)
        this.dealer = Player.build(true)
        this.deck = Deck.build()
        this.player.drawFirstCards(this.deck)
        this.dealer.drawFirstCards(this.deck)
        //this.checkBlackjack()
    }
    checkBlackjack(){
        const playerBlackjack = this.player.hasBlackjack()
        const dealerBlackjack = this.dealer.hasBlackjack()
        let blackjack = BlackjackTypes.nobody
        if (playerBlackjack && dealerBlackjack) {
            blackjack = BlackjackTypes.both
            console.log("Draw, both players have blackjack.")
        } else if (playerBlackjack) {
            blackjack = BlackjackTypes.player
            console.log("Blackjack, you won!")
        } else if (dealerBlackjack) {
            blackjack = BlackjackTypes.dealer
            console.log("Dealer blackjack, you lost.")
        } else {
        }
        return blackjack
    }
    drawPlayerCard(){
        this.player.drawCard(this.deck)
    }

    drawDealerCard(){
        this.dealer.drawCard(this.deck)
    }

    dealerMove() {
        controller.showDealerHiddenCard(this.dealer.hand.cards[0])
        while(this.dealer.getHandWorth()<17) {
          this.dealer.drawCard()
        }
    }

    getResult(){
        if (this.player.getHandWorth()>21) {
            return {result: GameResult.loss, mess: "Bust, dealer wins!"}
        } else if (this.dealer.getHandWorth()>21) {
            //dealer overdraft, player win
            return {result: GameResult.win, mess: "Dealer busts, you win!"}
        } else if (this.dealer.getHandWorth()>this.player.getHandWorth()) {
            //dealer more worth, dealer win
            return {result: GameResult.loss, mess: "Dealer wins!"}
        } else if (this.dealer.getHandWorth()<this.player.getHandWorth()) {
            //player more worth, player win
            return {result: GameResult.win, mess:"You win!"}
        } else {// even score
            return {result: GameResult.draw, mess: "Push"}
            //draw, nobody win
        }
    }
}