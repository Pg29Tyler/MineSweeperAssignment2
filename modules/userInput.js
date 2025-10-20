class UserInput {
	constructor(gameLogic) {
		this.gameLogic = gameLogic;

		this.boundHandler = this.handleClick.bind(this);
		//this.addEventListeners();
		this.addEventListeners("contextMenu", () => this.HandleRightClick());
	}
	addEventListeners() {
		const container = document.querySelector('#game-container');
		container?.addEventListener('click', this.boundHandler);
	}

	addEventListenersRightClick() {
		const container = document.querySelector('#game-container');
		container?.addEventListener('click', this.boundHandler);
	}

	handleClick(event) {
		const cell = event.target.closest('.cell');
		if (!cell) return;
		const index = parseInt(cell.dataset.index, 10);
		this.gameLogic.MakeLeftClickMove(index);
	}
	HandleRightClick(event) {
		const cell = event.target.closest('.cell');
		if (!cell) return;
		document.querySelector('.cell')
		const index = parseInt(cell.dataset.index, 10);
		this.gameLogic.MakeRightClickMove(index);
	}
	
}

export default UserInput;