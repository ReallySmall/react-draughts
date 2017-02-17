import { gridRefStringToNumericalArray, gridRefNumericalArrayToString } from 'game/helpers';
import { potentialMoves, availableMoves, moveActivePiece } from 'game/movepieces';
import { omit, findWhere, map, mapObject, some } from 'underscore';

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

	let canCapture = false;

	let updatedPieces = mapObject(pieces, (piece) => { // create new pieces object

		if(piece){
			const moves = availableMoves(pieces, piece.cellRef, gridSize); // get available moves for each piece
			piece.active = piece.player === activePlayer && moves.length ? true : false; // should piece be active?
			if(some(moves, (move) => { return move.captures !== null })){ // if any piece can capture an enemy piece
				canCapture = true; //... flag it
			}
		}

		return piece;

	});

	if(canCapture){ // if captures are possible

		updatedPieces = mapObject(updatedPieces, (piece) => { // recreate the pieces object

			if(piece){
				const moves = availableMoves(pieces, piece.cellRef, gridSize);
				// but this time only make pieces active that can capture
				piece.active = piece.player === activePlayer && moves.length && some(moves, (move) => { return move.captures !== null }) ? true : false;
			}

			return piece;

		});

	}

	return {
		captures: canCapture,
		pieces: updatedPieces
	}

};


export { unselectAllPieces, selectPiece, setActivePieces };
