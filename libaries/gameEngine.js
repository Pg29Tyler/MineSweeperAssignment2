import GameBoard from "../modules/gameBoard.js"
import UserInput from "../modules/userInput.js"
import GameLogic from "../modules/gameLogic.js"

class GameEngine {
    constructor(containerID) {
        this.containerID = containerID;

        this.GameBoard = new GameBoard(5, 5);
        this.GameLogic = new GameLogic(this.GameBoard);
        this.UserInput = new UserInput(this.GameLogic);

        this.GameBoard.renderBoard(this.containerID);


    }
}

export default GameEngine;