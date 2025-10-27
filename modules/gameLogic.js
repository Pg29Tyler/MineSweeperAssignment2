class GameLogic
{
    // Creating the gameBoard constructor and setting base values
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.currentAction = "1";
        this.flag = "|>";
        this.isGameOver = false;
        this.isFirstClick = true;
    }

    // Creating the MakeleftClickFunction with parameteres of index and cell
    MakeLeftClickMove(index, cell) {

        // Checking if the game is over or if there the board exists
        if (this.isGameOver || this.gameBoard.board[index]) return;
        if (cell.isRevealed) return;

        // Checking if its the first click and creating the mines if it is
        if (this.isFirstClick) {
            this.gameBoard.CreateMines(index);
            this.isFirstClick = false;
        }

        // Checking if the cell is a mine
        if (this.gameBoard.isMine(index)) {
            this.GameOver(cell);
            return;
        }

        // Calling the revealCell function and the checkWin function 
        this.revealCell(index, cell);
        this.checkWin();
    }

    // Creating the revealCell function with parameteres of index and cell
    revealCell(index, cell)
    {
        // checking if the cell is already revealed of if there is a flag on it
        if (cell.isRevealed || cell.textContent === this.flag) return;

        // Setting the cell to white and isRevealed to true for that one cell
        cell.style.backgroundColor = "white";
        cell.isRevealed = true;

        // Creating and updating the mineCount Variable with each cell revealed
        const mineCount = this.gameBoard.GetBesideMineCount(index);

        // Checking the there is more than 0 mines
        if (mineCount > 0)
        {
            cell.textContent = mineCount;
            this.gameBoard.updateCell(index, mineCount);
        }

        // if there is less than 0 mines update the cells text and update the cells and reveal any next cells possible
        else
        {
            cell.textContent = "";
            this.gameBoard.updateCell(index, "");
            this.revealNextCells(index);
        }
    }

    // Creating the revealNextCells function with the parameter of index
    revealNextCells(index)
    {
        // Creating variables for row, columns and, cells
        const row = Math.floor(index / this.gameBoard.cols)
        const col = index % this.gameBoard.cols;
        const cells = document.querySelectorAll(".cell");

        // Looping over each 8 tiles over around the cell clicked and revealing them if they arent toucing a mine
        for (let deltaRow = -1; deltaRow <= 1; deltaRow++)
        {
            for (let deltaCol = -1; deltaCol <= 1; deltaCol++)
            {
                if (deltaRow === 0 && deltaCol === 0) continue;

                const newRow = row + deltaRow;
                const newCol = col + deltaCol;

                if (newRow >= 0 && newRow < this.gameBoard.rows &&
                    newCol >= 0 && newCol < this.gameBoard.cols)
                {
                    const NextIndex = newRow * this.gameBoard.cols + newCol;
                    const NextCell = cells[NextIndex];

                    if (!NextCell.isRevealed && !this.gameBoard.isMine(NextIndex))
                    {
                        this.revealCell(NextIndex, NextCell);
                    }
                }
            }
        }
    }

    // Creating the checkWin function 
    checkWin()
    {
        // Creating constant variables for cells, totalCells, totalMines, safeCells, and a let variable called revealedTotal
        const cells = document.querySelectorAll(".cell");
        const totalCells = this.gameBoard.rows * this.gameBoard.cols;
        const totalMines = this.gameBoard.mineTotal;
        const safeCells = totalCells - totalMines;

        let revealedTotal = 0;

        //  Checking if the cell is revealed and the cell isnt a mine and incrementing the revealedTotal
        cells.forEach((cell, index) => {
            if (cell.isRevealed && !this.gameBoard.isMine(index))
            {
                revealedTotal++;
            }
        });

        // Checking if each safeCells are revealed and calling the win game function if it is
        if (revealedTotal === safeCells)
        {
            this.WinGame();
        }
    }

    // Creating the GameOver function with a parameter of clickedCell 
    GameOver(clickedCell)
    {
        // Setting game over to true
        this.isGameOver = true;

        // reavealing the clicked cell as a mine and setting it red
        clickedCell.textContent = "*";
        clickedCell.style.backgroundColor = "red";

        // Getting all cells and revealing each of the mines in the board and setting the to red
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            if (this.gameBoard.isMine(index)) {
                cell.textContent = "*"
                cell.style.backgroundColor = "red";
            }
        });

        // Displaying an alert to the player that they lost after a small delay

        setTimeout(() => {
            alert("You hit a mine you loseee!");
        }, 150);
            
    }

    // Creating the winGame function
    WinGame()
    {
        // Setting game over to true
        this.isGameOver = true;

        // Setting all mines to green and putting an exclamation point to show they flagged correctly
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            if (this.gameBoard.isMine(index)) {
                cell.textContent = "!";
                cell.style.backgroundColor = "lightgreen";
            }
        });

        // Displaying an alert to the player that they won after a small delay
        setTimeout(() => {
            alert("YOU WIN CONGRATSSS");
        }, 100);
        
    }

    // Creating the makeRightClickMove function with parameters of index and cell 
    makeRightClickMove(index, cell)
    {

        // Checking if the game is over or if the cell is revealed or not
        if (this.isGameOver || cell.isRevealed) return;

        // checking if the cell is already revealed and flagging it if it is not
        if (cell.isRevealed !==  this.flag) {
            this.gameBoard.updateCell(index, this.flag);
            cell.textContent = this.flag;
        }
    }
}
export default GameLogic;