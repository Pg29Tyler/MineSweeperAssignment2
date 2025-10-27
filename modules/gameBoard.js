class GameBoard {
    // Creating the constructor of the gameBoard and assining its values
    constructor(rows, cols, mineTotal) {
        this.rows = rows;
        this.cols = cols;
        this.mineTotal = mineTotal;
        this.board = this.createBoard();
        this.mines = new Set();
    }

    // Creating the createBoard function that just returns the array of the rows and columns
    createBoard()
    {
        return Array.from({ length: this.rows * this.cols }, () => '');
    }

    // Creating the CreateMines function with a parameter of firstClickIndex
    CreateMines(firstClickIndex)
    {
        // Clearing the mines to start and setting the value of totalCells and availableIndexes
        this.mines.clear();
        const totalCells = this.rows * this.cols;
        const availableIndexes = [];

        // The loop will create a list of all the valid postions excluding the cell that was firt clicked on
        for (let i = 0; i < totalCells; i++)
        {
            if (i !== firstClickIndex)
            {
                availableIndexes.push(i)
            }
        }
        // Looping over randomly placing the mines until each mine is placed in an available index 
        for (let i = 0; i < this.mineTotal; i++)
        {
            const RandIndex = Math.floor(Math.random() * availableIndexes.length);
            const mineIndex = availableIndexes[RandIndex];
            this.mines.add(mineIndex);
            availableIndexes.splice(RandIndex, 1);
        }
    }

    // Returning if the cell is a mine
    isMine(index)
    {
        return this.mines.has(index);
    }

    GetBesideMineCount(index)
    {
        const row = Math.floor(index / this.cols);
        const col = index % this.cols;
        let count = 0;

        for (let deltaRow = -1; deltaRow <= 1; deltaRow++)
        {
            for (let deltaCol = -1; deltaCol <= 1; deltaCol++)
            {
                if (deltaRow === 0 && deltaCol === 0) continue;

                const newRow = row + deltaRow
                const newCol = col + deltaCol;

                if (newRow >= 0 && newRow < this.rows &&
                    newCol >= 0 && newCol < this.cols)
                {
                    const NextIndex = newRow * this.cols + newCol;
                    if (this.isMine(NextIndex))
                    {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    // Creating the function of renderBoard with a parameter of containerId
    renderBoard(containerId)
    {
        // Getting the container value
        const container = document.getElementById(containerId);
        container.innerHTML = ' ';
        // Looping over the board creating cells based on the boards length
        for (let index = 0; index < this.board.length; index++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;
            cell.textContent = this.board[index] || '';
            container.appendChild(cell);
        }
    }
    // Creating an updateCell function with parameters of index and value
    updateCell(index, value)
    {
        // updating the game board at the specfic postion on the board
        this.board[index] = value;
    }

    // Creating the reset function
    reset() {
        
        this.board = this.createBoard();
        this.mines.clear();
        
    }
}
export default GameBoard;