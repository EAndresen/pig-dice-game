'use strict';

let currentPlayer = 0
let player0Score = 0
let player1Score = 0
let currentScore = 0

const btnRollDice = document.querySelector(`.btn--roll`)
btnRollDice.addEventListener(`click`, rollDice)

const btnHold = document.querySelector(`.btn--hold`)
btnHold.addEventListener(`click`, holdScore)

const btnNewGame = document.querySelector(`.btn--new`)
btnNewGame.addEventListener(`click`, newGame)
function addPlayerScore(score) {
  if (currentPlayer === 0) {
    player0Score = player0Score + score
    setPlayerScore(player0Score)
    if (player0Score > 19) {
      winner()
    }
  } else {
    player1Score = player1Score + score
    setPlayerScore(player1Score)
    if (player1Score > 19) {
      winner()
    }
  }
}

function winner() {
  let players = document.querySelectorAll(`.player`)
  players.forEach(player => {
    if (player.classList.contains(`player--` + currentPlayer)) {
      player.classList.add(`player--winner`)
    }
  })
  btnHold.disabled = true
  btnRollDice.disabled = true
}

function rollDice() {
  const diceRoll = randomIntFromInterval(1, 6)
  if (diceRoll === 1) {
    document.querySelector(`.dice`).src = `dice-` + diceRoll + `.png`
    endTurn(0)
  } else {
    document.querySelector(`.dice`).src = `dice-` + diceRoll + `.png`
    currentScore = Number(document.getElementById(`current--` + String(currentPlayer)).textContent)
    currentScore = currentScore + diceRoll
    document.getElementById(`current--` + String(currentPlayer)).textContent = String(currentScore)
  }
}

function holdScore() {
  endTurn(currentScore)

}

function endTurn(score) {
  if (score === 0) {
    resetCurrentPlayerScore()
    switchPlayer()
  } else {
    resetCurrentPlayerScore()
    addPlayerScore(score)
    switchPlayer()
  }
}

function switchPlayer() {
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0
  currentScore = 0
  let players = document.querySelectorAll(`.player`)
  players.forEach(player => {
    if (player.classList.contains(`player--active`)) {
      player.classList.remove(`player--active`)
    } else {
      player.classList.add(`player--active`)
    }
  })
}

function newGame() {
  let players = document.querySelectorAll(`.player`)
  players.forEach(player => {
    if (player.classList.contains(`player--0`) && !player.classList.contains(`player--active`)) {
      player.classList.add(`player--active`)
    } else if (player.classList.contains(`player--1`) && player.classList.contains(`player--active`)) {
      player.classList.remove(`player--active`)
    }

    if (player.classList.contains(`player--winner`)) {
      player.classList.remove(`player--winner`)
    }
  })

  for (let i = 0; i < 2; i++) {
    currentPlayer = i
    setPlayerScore(0)
  }
  player0Score = 0
  player1Score = 0
  currentScore = 0
  currentPlayer = 0

  if (btnHold.disabled) {
    btnHold.disabled = false
  }
  if (btnRollDice.disabled) {
    btnRollDice.disabled = false
  }
}

function resetCurrentPlayerScore() {
  document.getElementById(`current--` + String(currentPlayer)).textContent = `0`
}

function setPlayerScore(score){
  document.getElementById(`score--` + currentPlayer).textContent = score
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}