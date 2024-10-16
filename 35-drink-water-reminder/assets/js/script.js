// DOM elements
const dailyGoalInput = document.getElementById("dailyGoal");
const dailyGoalOutput = document.getElementById("dailyGoalValue");
const quantityInput = document.getElementById("dailyQuantity");
const quantityOutput = document.getElementById("quantityValue");
const hoursElement = document.querySelector(".countdown .hours span");
const minutesElement = document.querySelector(".countdown .minutes span");
const startButton = document.getElementById('start');
const modalContainer = document.querySelector('.modalContainer');
const closeButton = document.getElementById('close');
const percentageDisplay = document.getElementById('percentage');
const goal = document.getElementById('goal');


// Initializations
let totalGlassesTaken = -1;
let isCounting = false;
let timer;

// Constants
const TIME_AWAKE_IN_MINUTES = 960; // Equivalent to 16 hours awake

// Event listeners
dailyGoalInput.addEventListener("input", handledailyGoalInput);
quantityInput.addEventListener("input", handlequantityInput);
startButton.addEventListener('click', handleStartButtonClick);
closeButton.addEventListener('click', closeModal);

// Event handlers
function handledailyGoalInput() {
  const goalInMilliliters = Number(dailyGoalInput.value);
  dailyGoalOutput.textContent = `${goalInMilliliters}ml`;
  const goalInLiters = (goalInMilliliters / 1000).toFixed(1);
  goal.textContent = `Meta: ${goalInLiters} L`; // Set the goal in liters
  updateHourAndMinutesDisplay();
}


function handlequantityInput() {
  quantityOutput.textContent = `${quantityInput.value}ml`;
  updateHourAndMinutesDisplay();
}

function handleStartButtonClick() {
  if (isCounting) return;

  // Disable input type range elements
  dailyGoalInput.disabled = true;
  quantityInput.disabled = true;

  // Add the 'disabled-input' class to change cursor style
  dailyGoalInput.classList.add('disabled-input');
  quantityInput.classList.add('disabled-input');

  // Change the button text to "Timer Iniciado"
  startButton.textContent = "Timer Iniciado";

  isCounting = true;
  countdown();
}

// Functions
function calculate() {
  const totalGlassesOfWater = Number(dailyGoalInput.value / quantityInput.value);
  const totalTimerInMinutes = TIME_AWAKE_IN_MINUTES / totalGlassesOfWater;
  const [hour, minutes] = [Math.floor(totalTimerInMinutes / 60), Math.floor(totalTimerInMinutes % 60)];
  const percentageOfTotalGlassesTaken = Math.abs((totalGlassesTaken * 100 / totalGlassesOfWater) - 100) + '%';

  return {
    canTakeWater: totalGlassesTaken + 1 <= totalGlassesOfWater,
    hour,
    minutes,
    percentageOfTotalGlassesTaken
  };
}

function updateHourAndMinutesDisplay() {
  const { hour, minutes } = calculate();
  hoursElement.textContent = hour;
  minutesElement.textContent = minutes;
}

function countdown() {
  clearInterval(timer);
  if (!isCounting) return;

  const { canTakeWater } = calculate();
  if (!canTakeWater) return;

  let newHour = hoursElement.textContent;
  let newMinutes = Number(minutesElement.textContent) - 1;

  if (newMinutes < 0) {
    newMinutes = 59;
    newHour = Number(hoursElement.textContent) - 1;
  }

  if (newHour < 0) {
    clearInterval(timer);
    isCounting = false;
    openModal();
    return;
  }

  hoursElement.textContent = newHour;
  minutesElement.textContent = newMinutes;

  timer = setInterval(countdown, 10);
  // timer = setInterval(countdown, 60000); // Default is 1 minute
}

function openModal() {
  isCounting = false;
  modalContainer.style.display = 'block';
}

function closeModal() {
  modalContainer.style.display = 'none';
  isCounting = true;
  updateHourAndMinutesDisplay();
  countdown();
  updatePercentageDisplay();
}

function updatePercentageDisplay() {
  totalGlassesTaken++;
  const { percentageOfTotalGlassesTaken } = calculate();
  percentageDisplay.textContent = percentageOfTotalGlassesTaken;
}

// Initial updates
updateHourAndMinutesDisplay();
updatePercentageDisplay();