import { Hand } from "./Hand.js"
import { Deck } from "./Deck.js"

export class Player {
    constructor(isDealer, hand) {
        this.isDealer = isDealer
        this.hand = hand
    }
    static build(isDealer = false) {
        return new this(isDealer, Hand.build([]))
    }
    drawCard(deck) {
        this.hand.add(deck.shift())
    }
    drawFirstCards(deck) {
        this.drawCard(deck)
        this.drawCard(deck)
    }

    stand(){
    }

    hasBlackjack() {
        if (this.hand.getSize() === 2 && this.hand.getWorth() === 21) {
            return true
        } else { return false }
    }
}