const bells = new Audio("./sounds/bell.wav");

const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");

const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

let myInterval = null;
let totalSeconds = 0;
let isRunning = false;
let initialMinutes = parseInt(minuteDiv.textContent); // ✅ store original time

// 🧠 Update Display Function
const updateDisplay = () => {
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  secondDiv.textContent = secondsLeft < 10
    ? "0" + secondsLeft
    : secondsLeft;

  minuteDiv.textContent = minutesLeft;
};

// ⏳ Countdown Logic
const updateSeconds = () => {
  if (totalSeconds > 0) {
    totalSeconds--;
    updateDisplay();
  } else {
    bells.play();
    clearInterval(myInterval);
    isRunning = false;
  }
};

// ▶️ Start Timer
const startTimer = () => {
  if (!isRunning) {
    if (totalSeconds === 0) {
      totalSeconds = initialMinutes * 60;
    }
    myInterval = setInterval(updateSeconds, 1000);
    isRunning = true;
  }
};

// ⏸ Pause Timer
const pauseTimer = () => {
  clearInterval(myInterval);
  isRunning = false;
};

// 🔄 Reset Timer
const resetTimer = () => {
  clearInterval(myInterval);
  isRunning = false;

  const sessionAmount = parseInt(minuteDiv.textContent);
  totalSeconds = initialMinutes * 60;

  updateDisplay();
};

// 🎯 Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);