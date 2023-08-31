import { BlackjackTypes } from "./Constants.js"

export class Global{
    constructor(money){
        this.money = money
    }
    static build(money = 1000) {
        return new this(money)
    }
    placeBet(bet) {
        this.money -= bet
    }
    winSum(amount){
        this.money += amount
    }
    handleBlackJack(blackjackState, bet){
        switch(blackjackState){
            case BlackjackTypes.player:
                this.winSum(Math.round(bet*1.5))
                break
            case BlackjackTypes.both:
                this.winSum(bet)
                break
            default:
        }
        return this.money
    }
}