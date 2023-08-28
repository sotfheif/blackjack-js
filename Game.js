import {Player} from "./Player.js"
import {Deck} from "./Deck.js"
import {BlackjackTypes} from "./Constants.js"

export class Game{
    constructor(rules) {
        rules = this.rules
    }
    player
    dealer
    deck
    static build(rules) {
        return new this(rules)
    }
    start(){
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
        this.player.drawCard(deck)
    }

    drawDealerCard(){
        this.dealer.drawCard(deck)
    }

    gameOver(){

    }
}