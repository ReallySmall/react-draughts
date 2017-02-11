import { omit, findWhere, map, mapObject } from 'underscore';

// convert a grid ref string to a numerical array
const gridRefStringToNumericalArray = function(cellRef){

	const cellRefArray = cellRef.split('_');

	for(let i = 0; i < cellRefArray.length; i++){
		cellRefArray[i] = parseInt(cellRefArray[i]);
	}

	return cellRefArray;

}

// convert a grid ref string to a numerical array
const gridRefNumericalArrayToString = function(cellRef){

	const cellRefString = cellRef[0].toString() + '_' + cellRef[1].toString();

	return cellRefString;

}

// return a friendly alphanumeric grid reference for front end updates
const toFriendlyGridRef = function(cellRef){

	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	const cellRefArray = gridRefStringToNumericalArray(cellRef);
	const letterRef = alphabet.charAt(cellRefArray[0]).toUpperCase();
	const numberRef = cellRefArray[1] + 1;

	return letterRef + numberRef;

};

// return a game history entry
const createGameHistoryEntry = function(message, player){

	const gameHistoryEntry = {
		message: message,
		player: player
	};

	return gameHistoryEntry;

};

export { createGameHistoryEntry, gridRefStringToNumericalArray, gridRefNumericalArrayToString, toFriendlyGridRef };
