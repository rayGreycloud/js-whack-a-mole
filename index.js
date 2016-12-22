const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const hitSound = document.querySelector('.hit');

let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.random() * (max - min) + min;
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function popUp() {
  const time = randomTime(400, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) popUp();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  popUp();
  setTimeout(() => {
    timeUp = true;
  }, 10000);
}

function whack(e) {
  if (!e.isTrusted) return; // cheater using console
  score++;
  this.classList.remove('up');
  hitSound.play();
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));
