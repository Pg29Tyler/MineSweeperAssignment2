class UserInput {

	// Creating the userInput Constructor and assining and default values and calling nessasary functions
	constructor(gameLogic , maxFlags) {
		this.gameLogic = gameLogic;
		this.maxFlags = maxFlags;
		this.flagsUsed = 0;
		this.boundClickHandler = this.handleClick.bind(this);
		this.boundRightClickHandler = this.HandleRightClick.bind(this);
		this.addEventListeners();
		this.updateFlagDisplay();
	}

	// Creating the addEventListeners function 
	addEventListeners() {

		// Getting the container selector of the game-contianer and adding event listeners for left and right clicks
		const container = document.querySelector('#game-container');
		container.addEventListener('click', this.boundClickHandler);
		container.addEventListener('contextmenu', this.boundRightClickHandler);
	}

	// Creating the handleClick function with a parameter of event
	handleClick(event) {

		// Getting the cell that was clicked on and calling the MakeLeftClickMove function
		const cell = event.target.closest('.cell');
		if (!cell) return;
		const index = parseInt(cell.dataset.index, 10);
		this.gameLogic.MakeLeftClickMove(index, cell)
		

	}

	// Creating the RighthandleClick function with a parameter of event
	HandleRightClick(event) {
		// Preventing the default menu showing up with the right-click
		event.preventDefault();
		// Getting the click on cell and parseing index 
		const cell = event.target.closest('.cell');
		if (!cell) return;
		const index = parseInt(cell.dataset.index, 10);

		// Creating a constant variable calle has flag that checks if the cell has a flag
		const hasFlag = cell.textContent === this.gameLogic.flag;

		// Checking if the cell has a flag and removing it 
		if (hasFlag === true) {
			cell.textContent = " ";
			this.flagsUsed--;
			this.gameLogic.gameBoard.updateCell(index, "");
		}
		// if it does not already have a flag check if the user still has flags left to use and call the MakeRightClickMove function 
		else
		{
			if (this.flagsUsed < this.maxFlags)
			{
				this.gameLogic.makeRightClickMove(index, cell);

				// Increment the flagsUsed variable
				this.flagsUsed++;
			}
		}

		// Calling the updateFlagDisplay function
		this.updateFlagDisplay();
	}

	// Creating the updateFlagDisplay function 
	updateFlagDisplay()
	{
		// Getting the flag element and checking if there is a flagElement than updating the amount of flags left
		const flagElement = document.querySelector("#Flags");
		if (flagElement)
		{
			const remainingFlags = this.maxFlags - this.flagsUsed;
			flagElement.textContent = remainingFlags;
		}
	}
}

export default UserInput;