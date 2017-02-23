import { omit, findWhere, map, mapObject } from 'underscore';

// calculate direction of potential capture
const invertPlayDirection = (activePiece, opponentPiece) => { // TODO

	const activeCellArray = gridRefStringToNumericalArray(activePiece.cellRef);
	const opponentCellArray = gridRefStringToNumericalArray(opponentPiece.cellRef);

	return activePiece.type === 'king' ? false : true

};

// is a potential capture landing square in the movemnt plane of the active piece (pieces can only capture in straight lines)
const inMovementPlane = (activeCellRef, opponentCellRef, landingCellRef) => {

	const activeCellColIndex = gridRefStringToNumericalArray(activeCellRef)[1];
	const opponentCellColIndex = gridRefStringToNumericalArray(opponentCellRef)[1];
	const landingCellColIndex = gridRefStringToNumericalArray(landingCellRef)[1];

	if((opponentCellColIndex > activeCellColIndex && landingCellColIndex > opponentCellColIndex) || (opponentCellColIndex < activeCellColIndex && landingCellColIndex < opponentCellColIndex)){
		return true;
	}

	return false;

};

// convert a grid ref string to a numerical array
const canCoronate = (cellRef, player, gridSize) => {

	const cellRefArray = gridRefStringToNumericalArray(cellRef);

	if(player === 0 && cellRefArray[0] + 1 === gridSize){
		return true;
	}

	if(player === 1 && cellRefArray[0] === 0){
		return true;
	}

	return false;

};

// convert a grid ref string to a numerical array
const gridRefStringToNumericalArray = (cellRef) => {

	const cellRefArray = cellRef.split('_');

	for(let i = 0; i < cellRefArray.length; i++){
		cellRefArray[i] = parseInt(cellRefArray[i]);
	}

	return cellRefArray;

};

// convert a grid ref string to a numerical array
const gridRefNumericalArrayToString = (cellRef) => {

	const cellRefString = cellRef[0].toString() + '_' + cellRef[1].toString();

	return cellRefString;

};

// return a friendly alphanumeric grid reference for front end updates
const toFriendlyGridRef = (cellRef) => {

	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	const cellRefArray = gridRefStringToNumericalArray(cellRef);
	const letterRef = alphabet.charAt(cellRefArray[0]).toUpperCase();
	const numberRef = cellRefArray[1] + 1;

	return letterRef + numberRef;

};

// return a game history entry
const createGameHistoryEntry = (message, player) => {

	const gameHistoryEntry = {
		message: message,
		player: player
	};

	return gameHistoryEntry;

};

export { canCoronate, createGameHistoryEntry, gridRefStringToNumericalArray, gridRefNumericalArrayToString, inMovementPlane, invertPlayDirection, toFriendlyGridRef };
