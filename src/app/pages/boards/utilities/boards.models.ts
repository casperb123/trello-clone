export class Board {
  constructor(public id: string, public title: string, public lists?: List[]) {
    if (!lists) {
      lists = [];
    }
  }
}

export class List {
  constructor(public cards?: Card[]) {
    if (!cards) {
      cards = [];
    }
  }
}

export class Card {
  constructor(public text: string) {}
}
