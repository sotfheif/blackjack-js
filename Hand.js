import { MAX_SCORE } from "./Constants.js"

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
    getWorth() { 
        const ranks = this.cards.map(card => card.rank)
        let score = 0
        let aceCount = 0
        for (const rank of ranks) {
            if (rank === 1) { aceCount++ }
            if (rank === 11 || rank === 12 || rank == 13){
                score += 10
            } else {
                score += rank
            }
        }
        while ((score <= MAX_SCORE - 10) && (aceCount-- > 0)) {
            score += 10
        }
        return score
    }
    
    getSize() {
        return this.cards.length
    }

    addCard(card){
        this.cards.push(card)
    }
}