
const moles = document.querySelectorAll('.mole')
const hitMole = document.querySelector('.mole.whackedMole');
const rules = document.getElementsByClassName('rules');
var scoreBoard = document.getElementById('score');
var over = document.getElementsByClassName('game-over');
var score = 0;
const moleAppearingDelay = 1000; // Setting an interval for the moles appearing.
var intervalID;
const startButton = document.querySelector('button')
const grid = document.querySelectorAll('.grids')
var clicks = document.getElementById('clicks')
var numberClicks = 0;
const clickCeiling = 13;

// Picking a random mole to pop up:
function randomMole(moles) { // Takes a list of moles
  return Math.floor(Math.random() * moles.length);
}

// Getting the moles to pop up and down, in a random way determined above:
Array.from(moles)
function molesMoving() {
    intervalID = window.setInterval(function() {
      const currentMole = document.querySelector(".mole.moleAppearing");
      const mole =  moles[randomMole(moles)];
      if (currentMole) currentMole.classList.remove('moleAppearing');
      mole.classList.toggle('moleAppearing');
    }, moleAppearingDelay);
}

// functions triggering special effects when any mole is clicked on:
function createPoof(mole) {
  const parent = mole.parentElement;
  const img = document.createElement("img");
  img.src = "./images/poof.gif";
  img.classList.add("poof")
  parent.appendChild(img);
  window.setTimeout(() => {
    img.remove();
  }, 700)
}

function createBonk(mole) {
  const parent = mole.parentElement;
  const bonk = document.createElement("bonkSound");
  bonk.src = "./songs/bonk.mp3";
  bonk.classList.add("bonkSound")
  parent.appendChild(bonk);
}

// function for the moles to receive a hit on the head:
function whack(e){
  console.log(e)
  const currentMole = e.target || e.srcElement;
  if (currentMole) {
    currentMole.classList.add('.mole.whackedMole');
    createPoof(currentMole);
    createBonk(currentMole);
  }
  if (score < 10) {
    score++;
  }
  scoreBoard.textContent = score;
}

function initClicksView() {
  clicks.textContent = clickCeiling - numberClicks;
}

function countClicks(e) {
  // console.log("counting clicks");
    numberClicks++;
    const res = clickCeiling - numberClicks
    if (res >= 0) {
      clicks.textContent = res;
    } else{
      console.log("ici");
      stopGame();
    }
}

grid.forEach((click) => {
  click.addEventListener('click', countClicks)
});

moles.forEach(mole => {
  console.log(mole)
  mole.addEventListener('click', whack)
});

// function to show the 3-2-1-GO gif:
function triggerCountdown() {
  const parent = startButton.parentElement;
  const img = document.createElement("img");
  img.src = "./images/three-two-one-go.gif";
  img.classList.add("three-two-one-go")
  window.setTimeout(() => {
    parent.appendChild(img);
  }, 1000);
  window.setTimeout(() => {
    img.remove();
  }, 3700);
  window.setTimeout(() => {
    molesMoving();
  }, 2950);
  pushMusic();
}

function stopGame() {
    if (score === 10) {
    document.querySelector(".game-over").classList.add("winner", "isActive");
  }
  else if ((score < 10) && (numberClicks > clickCeiling)) {
    document.querySelector(".game-over").classList.add("loser", "isActive");
  }
  mole.classList.remove('moleAppearing');
}

// function that triggers the music when game starts:
function pushMusic() {
  const mySound = new Audio("./songs/luigis-mansion.mp3");
  window.setTimeout(() => {
    mySound.play();
    mySound.volume = 0.1;
  }, 950);
}

initClicksView();

startButton.onclick = triggerCountdown;

// Bonuses for the future:
// Stop the moles from coming out & stop the music when game is over (won or lost).
// Add some comments for the hits as well ("Good job!" "Well done!" "Yay!" vs "You missed!")
// Add a hammer to the cursor.
