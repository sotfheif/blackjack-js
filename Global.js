export class Global{
    constructor(money){
        this.money = money
    }
    build(money = 1000) {
        return new this(money)
    }
}