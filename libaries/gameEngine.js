import GameBoard from "../modules/gameBoard.js"
import UserInput from "../modules/userInput.js"
import GameLogic from "../modules/gameLogic.js"

class GameEngine {
    constructor(containerID) {
        this.containerID = containerID;

        //Creating the board and deciding the size and amount of bombs
        this.GameBoard = new GameBoard(10, 10, 20);
        this.GameBoard.CreateMines(0);

        // Creating each module for the game and assigning any necessary values
        this.GameLogic = new GameLogic(this.GameBoard);
        this.UserInput = new UserInput(this.GameLogic);
        this.UserInput = new UserInput(this.GameLogic, 20);
        this.GameBoard.renderBoard(this.containerID);

        this.resartButton();
    }

    // Creating the restartButton function that gets the button and adds an click event
    resartButton()
    {
        const restartGame = document.querySelector("#restartBtn");
        restartBtn.addEventListener("click", () => {

          // Calls restart when clicked
            this.restart();
        });
    }

    // Creating the resart function that resets the game and all values
    restart() {
        this.GameBoard.reset();
        this.GameLogic.isGameOver = false;
        this.GameLogic.isFirstClick = true;
        this.UserInput.flagsUsed = 0;
        this.UserInput.updateFlagDisplay();

        this.GameBoard.renderBoard(this.containerID);
    }
}



export default GameEngine;