// Get references to the HTML elements
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapTimesList = document.getElementById("lap-times");

// Variables for managing the stopwatch
let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

// Function to start the stopwatch
function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime; // Adjust startTime for resuming
    intervalId = setInterval(updateTime, 10); // Update time every 10 milliseconds
    isRunning = true;
  }
}

// Function to pause the stopwatch
function pause() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

// Function to reset the stopwatch
function reset() {
  pause();
  elapsedTime = 0;
  startTime = Date.now(); // Reset startTime for fresh start
  updateTime(); // Display initial time (00:00:00.000)
  lapTimesList.innerHTML = ""; // Clear lap times
}

// Function to record a lap time
function recordLap() {
  const lapTime = elapsedTime;
  lapTimesList.innerHTML += `<li>${formatTime(lapTime)}</li>`;
}

// Function to update the displayed time
function updateTime() {
  elapsedTime = Date.now() - startTime; // Ensure consistent time calculation
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Function to format time as hours:minutes:seconds.milliseconds
function formatTime(time) {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
}

// Add event listeners to the buttons
startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);
