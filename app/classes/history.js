import { createGameHistoryEntry, toFriendlyGridRef } from 'game/helpers';

class GameHistory {

    constructor() {

    	this.history = new Array();

    	this.startGame = () => { 
    		this.history = [createGameHistoryEntry('New game started'), ...this.history];
		};

		this.yourMove = (player, index) => { 
			this.history = [createGameHistoryEntry(player[index]['name'] + ' - it\'s your move', index), ...this.history];
		};

		this.movedTo = (player, index, cellRef, captures) => {
			const capturedText = captures === true ? ' and captured a piece' : '';
        	this.history = [createGameHistoryEntry(player[index]['name'] + ' moved to ' + toFriendlyGridRef(cellRef) + capturedText, index), ...this.history];
		};

    	this.coronated = (player, index) => { 
			this.history = [createGameHistoryEntry(player[index]['name'] + ' crowned a piece!', index), ...this.history];
		};

		this.mustMove = (player, index) => { 
			this.history = [createGameHistoryEntry(player[index]['name'] + ' - you must make another move', index), ...this.history];
		};

		this.mustCapture = (player, index) => { 
			this.history = [createGameHistoryEntry(player[index]['name'] + ' - you must capture a piece', index), ...this.history];
		};

		this.victory = (player, index, moves) => { 
			this.history = [createGameHistoryEntry(player[index]['name'] + ' - you won the game in ' + moves + ' moves!', index), ...this.history];
		};

		this.returnHistory = (prevHistory) => {
			
			const newMessages = this.history;
			let newHistory = prevHistory || new Array();

			this.history = new Array();

			for(let i = newMessages.length -1; i >= 0; i--){
				newHistory = [newMessages[i], ...newHistory];
			}

			return newHistory;

		};

    };

};

export { GameHistory as default };