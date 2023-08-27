export class Card {
    constructor(suit, rank) {
        this.suit = suit
        this.rank = rank
    }
    
    static build(suit, rank){
        return new this(suit, rank)
    }

}