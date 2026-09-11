const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timer = null;

function updateDisplay() {
    const time = elapsedTime;

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0");
}

function startStopwatch() {
    if (timer !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timer = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseStopwatch() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function resetStopwatch() {
    clearInterval(timer);

    timer = null;
    startTime = 0;
    elapsedTime = 0;

    updateDisplay();
    laps.innerHTML = "";
}

function addLap() {
    if (elapsedTime === 0) {
        return;
    }

    const lap = document.createElement("li");

    const lapNumber = laps.children.length + 1;

    lap.textContent = "Lap " + lapNumber + " — " + display.textContent;

    laps.appendChild(lap);
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);

updateDisplay();