import { MAX_SCORE } from "./Constants.js"

export class Card {
    constructor(suit, rank) {
        this.suit = suit
        this.rank = rank
    }
    
    static build(suit, rank){
        return new this(suit, rank)
    }

    static getCardsWorth(cards) { 
        const ranks = cards.map(card => card.rank)
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
}