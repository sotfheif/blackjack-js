import { Hand } from "./Hand.js"
import { Card } from "./Card.js"

const tests = {
    handGetWorth() {
        const name = "handGetWorth"
        let res = "fail"
        const hand = Hand.build([Card.build(0, 4), Card.build(0, 9)])

        if (hand.getWorth() === 13) {
            res = "pass"
        }
        console.log(res + " " + name)
    },

    handGetWorthSoftHand1() {
        const name = "handGetWorthSoftHand1"
        let res = "fail"
        const hand = Hand.build([Card.build(0, 1), Card.build(0, 6)])
        if (hand.getWorth() === 17) {
            res = "pass"
        }
        console.log(res + " " + name)
    },

    handGetWorth1Ace() {
        const name = "handGetWorth1Ace"
        let res = "fail"
        const hand = Hand.build([Card.build(0, 1), Card.build(0, 6),
        Card.build(0, 7)])
        if (hand.getWorth() === 14) {
            res = "pass"
        }
        console.log(res + " " + name)
    },

    handGetWorth2Ace() {
        const name = "handGetWorth2Ace"
        let res = "fail"
        const hand = Hand.build([Card.build(0, 6), Card.build(0, 1),
        Card.build(0, 7), Card.build(0, 1)])
        if (hand.getWorth() === 15) {
            res = "pass"
        }
        console.log(res + " " + name)
    },

    handGetWorthKing() {
        const name = "handGetWorthKing"
        let res = "fail"
        const hand = Hand.build([Card.build(0, 13), Card.build(0, 4)])
        if (hand.getWorth() === 14) {
            res = "pass"
        }
        console.log(res + " " + name)
    },

    handGetWorthQueenJackAce() {
        const name = "handGetWorthQueenJackAce"
        let res = "fail"
        const hand = Hand.build([Card.build(0, 12), Card.build(0, 11),
        Card.build(0, 1)])
        if (hand.getWorth() === 21) {
            res = "pass"
        }
        console.log(res + " " + name)
    },
}

Object.values(tests).map(value => {
    if (typeof value === 'function') {
        value.call();
    }
})
