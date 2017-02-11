import { gridRefStringToNumericalArray, gridRefNumericalArrayToString } from 'game/helpers';
import { omit, findWhere, map, mapObject } from 'underscore';

// Calculate the potential moves a piece could make
const potentialMoves = function(pieces, activePieceCellRef){

	const activePiece = pieces[activePieceCellRef];
	let potentialMoves = [];

	if(activePiece){

		const type = activePiece.type;
		const player = activePiece.player;
		const cellRef = gridRefStringToNumericalArray(activePiece.cellRef);
		const directionOfPlay = player === 0 ? +1 : -1;
		const reverseDirectionOfPlay = player === 0 ? -1 : +1;

		const forward = cellRef[0] + directionOfPlay;
		const backward = cellRef[0] + reverseDirectionOfPlay;
		const left = cellRef[1] - 1;
		const right = cellRef[1] + 1;

		potentialMoves.push(gridRefNumericalArrayToString([forward, left]));
		potentialMoves.push(gridRefNumericalArrayToString([forward, right]));

		if(type === 'king'){

			potentialMoves.push(gridRefNumericalArrayToString([backward, left]));
			potentialMoves.push(gridRefNumericalArrayToString([backward, right]));

		}

	}

	return potentialMoves;

};


// Calculate the actual moves available to a piece
const availableMoves = function(pieces, activePieceCellRef){

	const activePiece = pieces[activePieceCellRef];
	
	let availableMoves = {
		moves: [],
		canCapture: false
	};

	if(activePiece){

		const player = activePiece.player;
		
		map(potentialMoves(pieces, activePieceCellRef), function(potentialMove, j){

			const piece = pieces[potentialMove];

			if(!piece){ // is square empty?
				availableMoves.moves.push(potentialMove);
			} else if(piece && piece.player !== player){
				// TODO - taking opposing piece if space beyond is free
			}

		});

	}

	return availableMoves;

};


// Unselect all pieces
const unselectAllPieces = function(pieces){

	let updatedPieces = mapObject(pieces, function (piece) { 
		piece.selected = false;
		if(piece.type !== 'landing'){
			return piece;
		} 
	});

	return updatedPieces;

};


// Select a piece
const selectPiece = function(pieces, activePieceCellRef){

	let updatedPieces = unselectAllPieces(pieces);
	let potentialMoves = [];
	const player = updatedPieces[activePieceCellRef]['player'];

	updatedPieces[activePieceCellRef]['selected'] = true;
	
	potentialMoves = availableMoves(updatedPieces, activePieceCellRef).moves;

	map(potentialMoves, function(potentialMove, i){

		updatedPieces[potentialMove] = { 
			cellRef: potentialMove, 
        	player: player,
        	colour: 'landing', 
			type: 'landing', 
			active: false, 
			selected: false 
		};
		
 	});

	return updatedPieces;

};


// Move an active piece to a new square
const moveActivePiece = function(pieces, landingPieceCellRef, gridSize){

	let selectedPiece = findWhere(pieces, { selected: true });

	if(selectedPiece){

		let updatedPieces = omit(pieces, function(value, key, object) {
  			return value.type === 'landing' || value.selected === true;
		});

		selectedPiece['selected'] = false;
		selectedPiece['cellRef'] = landingPieceCellRef;

		updatedPieces[landingPieceCellRef] = selectedPiece;

		return updatedPieces;

	}

	return pieces;

};


// Set pieces for the current player which have available moves as active
const setActivePieces = function(pieces, activePlayer){

	let updatedPieces = mapObject(pieces, function (piece) { 
		piece.active = piece.player === activePlayer && availableMoves(pieces, piece.cellRef).moves.length ? true : false;;
		return piece;
	});

	return updatedPieces;

};


export { availableMoves, unselectAllPieces, selectPiece, setActivePieces, moveActivePiece };
