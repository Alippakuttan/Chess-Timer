const playBtn = document.querySelector(".play");
const white = document.querySelector(".white");
const black = document.querySelector(".black");
const whiteText = document.querySelector(".white p");
const blackText = document.querySelector(".black p");

var gameOn = false;
var gameStart = false;
var turn = "white";

let whiteTimer = null;
let blackTimer = null;

var whiteTime = 10;
var blackTime = 10;

playBtn.addEventListener("click", () => {
  if (gameStart === false) {
    startGame();
  } else {
    if (gameOn === false) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
});

function startGame() {
  whiteTimer = setInterval(whiteCountdown, 1000);
  gameOn = true;
  gameStart = true;
  playBtn.innerHTML = "pause";
}

function pauseGame() {
  if (turn === "white") {
    clearInterval(whiteTimer);
  } else {
    clearInterval(blackTimer);
  }
  gameOn = false;
  playBtn.innerHTML = "resume";
}

function resumeGame() {
  if (turn === "white") {
    whiteTimer = setInterval(whiteCountdown, 1000);
  } else {
    blackTimer = setInterval(blackCountdown, 1000);
  }
  playBtn.innerHTML = "pause";
  gameOn = true;
}

white.addEventListener("click", () => {
  if (gameOn === true) {
    if (turn === "white") {
      clearInterval(whiteTimer);
      blackTimer = setInterval(blackCountdown, 1000);
      turn = "black";
    }
  }
});

black.addEventListener("click", () => {
  if (gameOn === true) {
    if (turn === "black") {
      clearInterval(blackTimer);
      whiteTimer = setInterval(whiteCountdown, 1000);
      turn = "white";
    }
  }
});

function whiteCountdown() {
  whiteTime--;
  var sec = whiteTime % 60;
  var min = (whiteTime - sec) / 60;
  if (sec < 10) {
    sec = `0${sec}`;
  }
  whiteText.innerHTML = `${min}:${sec}`;
  if (whiteTime === 0) {
    clearInterval(whiteTimer);
    endGame();
  }
}

function blackCountdown() {
  blackTime--;
  var sec = blackTime % 60;
  var min = (blackTime - sec) / 60;
  if (sec < 10) {
    sec = `0${sec}`;
  }
  blackText.innerHTML = `${min}:${sec}`;
  if (blackTime === 0) {
    clearInterval(blackTime);
    endGame();
  }
}

function endGame() {
  if (turn === "white") {
    document.querySelector(".black-win").style.display = "flex";
  } else {
    document.querySelector(".white-win").style.display = "flex";
  }
}
