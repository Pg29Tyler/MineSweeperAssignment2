import GameEngine from "./libaries/gameEngine.js";

const game = new GameEngine('game-container');

// Creating the variables for the timer
const CounterElement = document.querySelector("#Counter");
let count = 0;

// Creating the timer and counting up each second

function pad(val) {
    return val > 9 ? val : "0" + val;
}
setInterval(() => {
    count = (count + 1) % 999;
    CounterElement.textContent = pad(count);
}, 1000);
export default app;

