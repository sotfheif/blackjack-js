import { MAX_SCORE } from "./Constants.js"
import { Card } from "./Card.js"

export class Hand {
    constructor(cards){
        this.cards = cards
    }
    cards
    static build(cards){
        return new this(cards)
    }

    /* mb use worth property and calcWorth() method which updates
    property value instead
    */
    getWorth(include1stCard = true) { 
        return include1stCard ? Card.getCardsWorth(this.cards)
        : Card.getCardsWorth(this.cards.slice(1))
    }
    
    getSize() {
        return this.cards.length
    }

    addCard(card){
        this.cards.push(card)
    }
}