import { Hand } from "./Hand.js"
import { Deck } from "./Deck.js"

export class Player {
    isDealer = false
    constructor(isDealer) {
        this.isDealer = isDealer
    }
    static build(isDealer){
        return new Player(isDealer)
    }
    hand
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