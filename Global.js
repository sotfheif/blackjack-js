export class Global{
    constructor(money){
        this.money = money
    }
    static build(money = 1000) {
        return new this(money)
    }
}