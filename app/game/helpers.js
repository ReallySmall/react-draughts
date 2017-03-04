import { omit, findWhere, map, mapObject } from 'underscore';

// calculate direction of potential capture
// landing squares are calculated from pov of the piece being captured
// when capturing with pawns, default behaviour is to invert direction of play
// because the piece capturing it is moving in the other direction.
// Kings can capture in either direction and require additional logic
const invertPlayDirection = (activePiece, opponentPiece) => {

	if(activePiece.type !== 'king' && opponentPiece.type !== 'king'){
		return true;
	}

	const activeCellArray = gridRefStringToNumericalArray(activePiece.cellRef);
	const opponentCellArray = gridRefStringToNumericalArray(opponentPiece.cellRef);

	if(activePiece.player === 0){ // if the king belongs to player 1

		if(activeCellArray[0] < opponentCellArray[0]){
			return true;
		}

		return false;

	} else { // if the king belongs to player 2

		if(activeCellArray[0] > opponentCellArray[0]){
			return true;
		}

		return false;

	}

};

// is a potential capture landing square in the movemnt plane of the active piece (pieces can only capture in straight lines)
const inMovementPlane = (activeCellRef, opponentCellRef, landingCellRef) => {

	const activeCellRowIndex = gridRefStringToNumericalArray(activeCellRef)[0];
	const opponentCellRowIndex = gridRefStringToNumericalArray(opponentCellRef)[0];
	const landingCellRowIndex = gridRefStringToNumericalArray(landingCellRef)[0];
	const activeCellColIndex = gridRefStringToNumericalArray(activeCellRef)[1];
	const opponentCellColIndex = gridRefStringToNumericalArray(opponentCellRef)[1];
	const landingCellColIndex = gridRefStringToNumericalArray(landingCellRef)[1];

	if(landingCellRowIndex === activeCellRowIndex){
		return false;
	}

	if((opponentCellColIndex > activeCellColIndex && landingCellColIndex > opponentCellColIndex) 
		|| (opponentCellColIndex < activeCellColIndex && landingCellColIndex < opponentCellColIndex)){
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
