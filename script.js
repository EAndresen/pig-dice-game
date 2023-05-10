'use strict';

const diceEl = document.querySelector(`.dice`);
const btnRollEl = document.querySelector(`.btn--roll`);
const btnHoldEl = document.querySelector(`.btn--hold`);
const btnNewEl = document.querySelector(`.btn--new`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

btnRollEl.addEventListener(`click`, rollDice);
btnHoldEl.addEventListener(`click`, holdScore);
btnNewEl.addEventListener(`click`, init);

let currentPlayer, scores, currentScore;

init();

function init() {
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);

  let players = document.querySelectorAll(`.player`);
  players.forEach(player => {
    if (player.classList.contains(`player--winner`)) {
      player.classList.remove(`player--winner`);
    }
  });

  for (let i = 0; i < 2; i++) {
    currentPlayer = i;
    setPlayerScore(0);
  }

  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  btnHoldEl.disabled = false;
  btnRollEl.disabled = false;
}

function addPlayerScore(score) {
  scores[currentPlayer] += score;
  setPlayerScore(scores[currentPlayer]);
  if (scores[currentPlayer] > 19) {
    winner();
  }
}


function winner() {
  diceEl.classList.add(`hidden`);
  document.querySelector(`.player--${currentPlayer}`).classList.add(`player--winner`);
  btnHoldEl.disabled = true;
  btnRollEl.disabled = true;
}

function rollDice() {
  const dice = randomIntFromInterval(1, 6);
  diceEl.classList.remove(`hidden`);
  diceEl.src = `dice-${dice}.png`;
  if (dice === 1) {
    endTurn(0);
  } else {
    currentScore = currentScore + dice;
    document.getElementById(`current--${String(currentPlayer)}`).textContent = String(currentScore);
  }
}

function holdScore() {
  endTurn(currentScore);
}

function endTurn(score) {
  if (score === 0) {
    resetCurrentPlayerScore();
    switchPlayer();
  } else {
    resetCurrentPlayerScore();
    addPlayerScore(score);
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

function resetCurrentPlayerScore() {
  document.getElementById(`current--${String(currentPlayer)}`).textContent = `0`;
}

function setPlayerScore(score) {
  document.getElementById(`score--${String(currentPlayer)}`).textContent = score;
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}