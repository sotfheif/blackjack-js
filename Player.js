import { Hand } from "./Hand.js"

export class Player {
    constructor(isDealer, hand) {
        this.isDealer = isDealer
        this.hand = hand
    }
    static build(isDealer = false) {
        return new this(isDealer, Hand.build([]))
    }
    drawCard(deck) {
        console.log("typeof deck = " + typeof deck)
        console.log("deck card count = " + deck.cards.length)
        return this.hand.addCard(deck.giveCard())
    }
    drawFirstCards(deck) {
        this.drawCard(deck)
        this.drawCard(deck)
    }

    hasBlackjack() {
        if (this.hand.getSize() === 2 && this.hand.getWorth() === 21) {
            return true
        } else { return false }
    }

    getHandWorth() {
        return this.hand.getWorth()
    }
}