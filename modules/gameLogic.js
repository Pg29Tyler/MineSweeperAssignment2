class GameLogic
{
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.currentAction = "1";
        this.flag = "|>";
        this.isGameOver = false;
    }
    MakeLeftClickMove(index)
    {
        if (this.isGameOver || this.gameBoard.board[index]) return;

        this.gameBoard.updateCell(index, this.currentAction);

        this.gameBoard.renderBoard('game-container');

        this.currentAction = this.currentAction;
    }
    makeRightClickMove(index)
    {
        if (this.isGameOver || this.gameBoard.board[index]) return;

        this.gameBoard.updateCell(index, this.flag);

        this.gameBoard.renderBoard('game-container');
        this.flag = this.flag;

    }

}
export default GameLogic;