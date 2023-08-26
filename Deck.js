import {Card} from "./Card.js"
import {Ranks} from "./Constants.js"
import {Suits} from "./Constants.js"

export class Deck{
    constructor(cards){
        this.cards = cards
    }
    cards
    static build(){
        console.log(Object.keys(Ranks))
        let cards = []
        for (const suit of Object.values(Suits)) {
            for (const rank of Object.values(Ranks)) {
                cards.push(Card.build(suit, rank))
            }
        }
        return new Deck(cards)
    }
    test(){
        console.log("test")
    }
}