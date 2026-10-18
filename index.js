const playBtn = document.querySelector(".play");
const menuBtn = document.querySelector(".menu-btn");
const timeWrapper = document.querySelector(".time-option-wrapper");
const white = document.querySelector(".white");
const black = document.querySelector(".black");
const whiteText = document.querySelector(".white p");
const blackText = document.querySelector(".black p");

var gameOn = false;
var gameStart = false;
var turn = "white";

let whiteTimer = null;
let blackTimer = null;

var whiteTime = 600;
var blackTime = 600;
var addTime = 0;

menuBtn.addEventListener("click", () => {
  timeWrapper.classList.toggle("time-option-wrapper-visible");
});

document.querySelectorAll(".time-option").forEach((op) => {
  op.addEventListener("click", (e) => {
    var time = e.target.getAttribute("time");
    var add = e.target.getAttribute("add");
    whiteTime = Number(time) * 60;
    blackTime = Number(time) * 60;
    addTime = Number(add);
    whiteText.innerHTML = `${time}:00`;
    blackText.innerHTML = `${time}:00`;
    timeWrapper.classList.toggle("time-option-wrapper-visible");
  });
});

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
  menuBtn.style.left = "-50px";
  bigSmall();
}

function pauseGame() {
  if (turn === "white") {
    clearInterval(whiteTimer);
  } else {
    clearInterval(blackTimer);
  }
  gameOn = false;
  playBtn.innerHTML = "resume";
  sameSize();
}

function resumeGame() {
  if (turn === "white") {
    whiteTimer = setInterval(whiteCountdown, 1000);
  } else {
    blackTimer = setInterval(blackCountdown, 1000);
  }
  playBtn.innerHTML = "pause";
  gameOn = true;
  bigSmall();
}

white.addEventListener("click", () => {
  if (gameOn === true) {
    if (turn === "white") {
      clearInterval(whiteTimer);
      whiteTime = whiteTime + addTime;
      var sec = whiteTime % 60;
      var min = (whiteTime - sec) / 60;
      if (sec < 10) {
        sec = `0${sec}`;
      }
      whiteText.innerHTML = `${min}:${sec}`;
      blackTimer = setInterval(blackCountdown, 1000);
      turn = "black";
      bigSmall();
    }
  }
});

black.addEventListener("click", () => {
  if (gameOn === true) {
    if (turn === "black") {
      clearInterval(blackTimer);
      blackTime = blackTime + addTime;
      var sec = blackTime % 60;
      var min = (blackTime - sec) / 60;
      if (sec < 10) {
        sec = `0${sec}`;
      }
      blackText.innerHTML = `${min}:${sec}`;
      whiteTimer = setInterval(whiteCountdown, 1000);
      turn = "white";
      bigSmall();
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

function bigSmall() {
  if (turn === "white") {
    white.classList.add("big");
    black.classList.add("small");
    white.classList.remove("small");
    black.classList.remove("big");
    playBtn.style.top = "30vh";
  } else {
    black.classList.add("big");
    white.classList.add("small");
    black.classList.remove("small");
    white.classList.remove("big");
    playBtn.style.top = "70vh";
  }
}

function sameSize() {
  white.classList.remove("small");
  white.classList.remove("big");
  black.classList.remove("small");
  black.classList.remove("big");
  playBtn.style.top = "50vh";
}
