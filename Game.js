import {Player} from "./Player.js"
import {Deck} from "./Deck.js"

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
        if (playerBlackjack && dealerBlackjack) {
            console.log("Draw, both players have blackjack.")
        } else if (playerBlackjack) {
            console.log("Blackjack, you won!")
        } else if (dealerBlackjack) {
            console.log("Dealer blackjack, you lost.")
        } else {

        }
    }
}