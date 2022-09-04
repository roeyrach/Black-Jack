const PATH = "richardschneider-cardsJS-fe5e857/cards/"
const SEC = 500
// Variables
var dealerSum = 0
var yourSum = 0

var dealerAceCount = 0
var yourAceCount = 0

var hidden
var hiddenCardElement
var deck

var canHit = true

var lock = false
// Variables-end

function load() {
	window.onload = function () {
		buildDeck()
		shuffle()
		startGame()
	}
}
load()
function buildDeck() {
	let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
	let types = ["C", "D", "H", "S"]
	deck = []

	for (let i = 0; i < types.length; i++) {
		for (let j = 0; j < values.length; j++) {
			deck.push(values[j] + "-" + types[i]) //A-C -> K-C, A-D -> K-D
		}
	}
	console.log(deck)
}

function shuffle() {
	for (let i = 0; i < deck.length; i++) {
		let j = Math.floor(Math.random() * deck.length) // (0-1) * 52 => (0-51.9999)
		let temp = deck[i]
		deck[i] = deck[j]
		deck[j] = temp
	}
	console.log(deck)
}

function startGame() {
	for (let i = 0; i < 2; i++) {
		setTimeout(function timer() {
			setTimeout(function () {
				openCard("your-cards")
			}, SEC)
		}, i * SEC * 2)
	}
	setTimeout(function () {
		let message = ""
		if (yourSum == 21) {
			message = "You win!"
			alot(message)
		}
		console.log(yourSum)
	}, SEC * 3.5)
	setTimeout(function () {
		openCard("dealer-cards")
	}, SEC * 2)

	setTimeout(function () {
		hiddenCardElement = document.createElement("img")
		hiddenCardElement.id = "hidden"
		hidden = deck.pop()
		dealerSum += getValue(hidden)
		dealerAceCount += checkAce(hidden)
		hiddenCardElement.src = PATH + "RED_BACK" + ".svg"
		document.getElementById("dealer-cards").prepend(hiddenCardElement)
	}, SEC * 4)

	document.getElementById("hit").addEventListener("click", hit)
	document.getElementById("stand").addEventListener("click", stand)
}

function hit() {
	if (!lock) {
		if (!canHit) {
			return
		}
		openCard("your-cards")
		if (reduceAce(yourSum, yourAceCount) > 21) {
			//A, J, 8 -> 1 + 10 + 8
			canHit = false
		}
		let message = ""
		if (yourSum > 21) {
			message = "You Lose!"
			alot(message)
		} else if (yourSum == 21) {
			message = "You win!"
			alot(message)
		}
	}
}

function stand() {
	if (!lock) {
		dealerSum = reduceAce(dealerSum, dealerAceCount)
		yourSum = reduceAce(yourSum, yourAceCount)

		canHit = false
		let cardSplited = hidden.split("-")

		hiddenCardElement.src = PATH + cardSplited[0] + cardSplited[1] + ".svg"

		var counter = 0

		var timer = setInterval(function () {
			if (dealerSum < 17) {
				openCard("dealer-cards")
				if (counter >= 500 || dealerSum >= 17) {
					clearInterval(timer)
				}
			}
			counter++
		}, SEC)

		setTimeout(function () {
			let message = ""
			if (yourSum > 21) {
				message = "You Lose!"
			} else if (dealerSum > 21) {
				message = "You win!"
			}
			//both you and dealer <= 21
			else if (yourSum == dealerSum) {
				message = "Tie!"
			} else if (yourSum > dealerSum) {
				message = "You Win!"
			} else if (yourSum < dealerSum) {
				message = "You Lose!"
			}
			alot(message)
		}, SEC * 1.5)
	}
}

function again() {
	location.reload()
}

function alot(message) {
	lock = true
	document.getElementById("dealer-sum").innerText = dealerSum
	document.getElementById("your-sum").innerText = yourSum
	document.getElementById("results").innerText = message

	let btn82 = document.createElement("button")
	btn82.id = "again"
	btn82.className = "button-82-pushable"
	let btn82_1 = document.createElement("span")
	btn82_1.className = "button-82-shadow"
	let btn82_2 = document.createElement("span")
	btn82_2.className = "button-82-edge"
	let btn82_3 = document.createElement("span")
	btn82_3.className = "button-82-front"
	btn82_3.innerText = "Again?"
	btn82.appendChild(btn82_1)
	btn82.appendChild(btn82_2)
	btn82.appendChild(btn82_3)
	document.getElementById("btns").append(btn82)
	document.getElementById("again").addEventListener("click", again)
}

function getValue(card) {
	let data = card.split("-")
	let value = data[0]
	if (isNaN(value)) {
		// J, Q, K, A
		if (value == "A") {
			return 11
		}
		return 10
	}
	return parseInt(data[0])
}

function checkAce(card) {
	if (card[0] == "A") {
		return 1
	}
	return 0
}

function openCard(Name) {
	let cardImg = document.createElement("img")
	let card = deck.pop()
	let cardSplited = card.split("-")
	if (Name == "your-cards") {
		yourSum += getValue(card)
		yourAceCount += checkAce(card)
	} else if (Name == "dealer-cards") {
		dealerSum += getValue(card)
		dealerAceCount += checkAce(card)
	}
	cardImg.src = PATH + cardSplited[0] + cardSplited[1] + ".svg"
	document.getElementById(Name).append(cardImg)
}

function reduceAce(playerSum, playerAceCount) {
	while (playerSum > 21 && playerAceCount > 0) {
		playerSum -= 10
		playerAceCount -= 1
	}
	return playerSum
}
