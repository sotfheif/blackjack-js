import {Card} from "./Card.js"
import {Suits, Ranks} from "./Constants.js"

export class Deck{
    constructor(cards){
        this.cards = cards
    }
    cards
    static build(){
        let cards = []
        for (const suit of Object.values(Suits)) {
            for (const rank of Object.values(Ranks)) {
                cards.push(Card.build(suit, rank))
            }
        }
        return new this(shuffled(cards))
    }
}