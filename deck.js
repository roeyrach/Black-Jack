const SUITS = ["♠", "♣", "♥", "♦"]
const VALUE = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const PATH = "richardschneider-cardsJS-fe5e857/cards/"

export default class Deck {
	constructor(cards = freshDeck()) {
		this.cards = cards
	}

	get numberOfCards() {
		return this.cards.length
	}

	shuffle() {
		for (let i = this.numberOfCards - 1; i > 0; i--) {
			const newIndex = Math.floor(Math.random() * (i + 1))
			const oldValue = this.cards[newIndex]
			this.cards[newIndex] = this.cards[i]
			this.cards[i] = oldValue
		}
	}
}

class Card {
	constructor(suit, value) {
		this.suit = suit
		this.value = value
	}
}

function getHTML() {
	const cardImg = document.createElement("img")
}

;<img class="card" src="richardschneider-cardsJS-fe5e857/cards/QD.svg" />

function freshDeck() {
	return SUITS.flatMap((suit) => {
		return VALUE.map((value) => {
			return new Card(suit, value)
		})
	})
}
