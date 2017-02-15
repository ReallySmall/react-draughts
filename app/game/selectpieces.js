import { gridRefStringToNumericalArray, gridRefNumericalArrayToString } from 'game/helpers';
import { potentialMoves, availableMoves, moveActivePiece } from 'game/movepieces';
import { omit, findWhere, map, mapObject } from 'underscore';

// Unselect all pieces
const unselectAllPieces = (pieces) => {

	let updatedPieces = mapObject(pieces, (piece) => {

		if(piece && piece.type !== 'landing'){
			piece.selected = false;
			return piece;
		}

	});

	return updatedPieces;

};


// Select a piece
const selectPiece = (pieces, activePieceCellRef, gridSize) => {

	let updatedPieces = unselectAllPieces(pieces);
	let potentialMoves = availableMoves(updatedPieces, activePieceCellRef, gridSize);
	
	const { player } = updatedPieces[activePieceCellRef];

	updatedPieces[activePieceCellRef]['selected'] = true;
	
	map(potentialMoves, (potentialMove, i) => {

		const { move, captures } = potentialMove

		updatedPieces[move] = { 
			cellRef: move, 
        	player: player,
        	colour: 'landing', 
			type: 'landing', 
			active: false, 
			selected: false,
			captures: captures
		};
		
 	});

	return updatedPieces;

};


// Set pieces for the current player which have available moves as active
const setActivePieces = (pieces, activePlayer, gridSize) => {

	let moves = [];
	let updatedPieces = mapObject(pieces, (piece) => {

		if(piece){
			moves = availableMoves(pieces, piece.cellRef, gridSize);
			piece.active = piece.player === activePlayer && moves.length ? true : false;
		}

		return piece;

	});

	return updatedPieces;

};


export { unselectAllPieces, selectPiece, setActivePieces };
