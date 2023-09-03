import { BlackjackTypes, GameResult } from "./Constants.js"

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
        this.money = this.money + amount
    }
    handleBlackJack(blackjackState, bet){
        switch(blackjackState){
            case BlackjackTypes.player:
                this.winSum(Math.round(bet*2.5))
                break
            case BlackjackTypes.both:
                this.winSum(bet)
                break
            default:
        }
        return this.money
    }

    endGame(gameResult, bet){
       console.log("global.endGame() start this.money =" + this.money +", bet = "+ bet)
        switch (gameResult){
            case GameResult.draw:
                this.winSum(bet)
                break
            case GameResult.win:
                this.winSum(bet*2)
                break
            case GameResult.loss:
                break
            default:
        }
        console.log("global.endGame() before return this.money =" + this.money)
        return this.money    
    }
}