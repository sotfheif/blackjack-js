export const Suits = Object.freeze({
    Clubs: 0,
    Spades: 1,
    Hearts: 2,
    Diamonds: 3
  })

export const Ranks = Object.freeze({
    ace: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 11,
    queen: 12,
    king: 13
  })

  export const States = Object.freeze({
    betting: 0,
    gameStarted: 1,
    dealerMove: 2,
  })

  export const BlackjackTypes = Object.freeze({
    nobody: 0,
    player: 1,
    dealer: 2,
    both: 3
  })

  export const suitFileName = new Map([[Suits.Clubs, "clubs"],
  [Suits.Diamonds, "diamonds"],[Suits.Hearts, "hearts"],
  [Suits.Spades, "spades"]])

  export const rankFileName = new Map([
    [Ranks.ace, "ace"],
    [Ranks.two, 2],
    [Ranks.three, 3],
    [Ranks.four, 4],
    [Ranks.five, 5],
    [Ranks.six, 6],
    [Ranks.seven, 7],
    [Ranks.eight, 8],
    [Ranks.nine, 9],
    [Ranks.ten, 10],
    [Ranks.jack, "jack"],
    [Ranks.queen, "queen"],
    [Ranks.king, "king"]
  ])
  
  export const MAX_SCORE = 21

  