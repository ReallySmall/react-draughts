import { omit, findWhere, map, mapObject } from 'underscore';

// Calculate the potential moves a piece could make
const potentialMoves = function(pieces, activePieceCellRef){

	const activePiece = pieces[activePieceCellRef];
	const type = activePiece.type;
	const player = activePiece.player;
	const cellRef = activePiece.cellRef.split('_');
	const directionOfPlay = player === 0 ? +1 : -1;
	const reverseDirectionOfPlay = player === 0 ? -1 : +1;

	let potentialMoves = [];

	const forward = parseInt(cellRef[0]) + directionOfPlay;
	const left = parseInt(cellRef[1]) - 1;
	const right = parseInt(cellRef[1]) + 1;

	potentialMoves.push(forward.toString() + '_' + left.toString());
	potentialMoves.push(forward.toString() + '_' + right.toString());

	if(type === 'king'){}

	return potentialMoves;

};


// Calculate the moves available to a piece
const availableMoves = function(pieces, activePieceCellRef){

	const activePiece = pieces[activePieceCellRef];

	let availableScoringMoves = [];
	let allAvailableMoves = [];
	let impossibleMoves = [];
	let z;

	if(activePiece){

		const player = activePiece.player;
		const otherPlayer = player === 0 ? 1: 0;
		
		let availableSingleMoves = potentialMoves(pieces, activePieceCellRef);

		map(availableSingleMoves, function(availableSingleMove, j){

			const piece = pieces[availableSingleMove];

			if(piece && piece.player > -1){ // can't land on another piece
				impossibleMoves.push(availableSingleMove);
				if(piece.player === otherPlayer){ // if square occupied by opposing piece
					//availableScoringMoves.push(potentialMoves(pieces, piece)) // check if square behind it is empty
				}
			}

		});

		map(availableScoringMoves, function(availableScoringMove, k){

			const piece = pieces[availableScoringMove];

			if(piece && piece.player > -1){ // can't land on another piece
				impossibleMoves.push(availableScoringMove);
			}

		});

		allAvailableMoves = [...availableSingleMoves, ...availableScoringMoves];

		while((z = impossibleMoves.pop()) != null){ // remove all the impossible moves from the list of potential moves
			allAvailableMoves.splice(z, 1);
		}

	}

	return allAvailableMoves;

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

	updatedPieces[activePieceCellRef]['selected'] = true;
	
	potentialMoves = availableMoves(updatedPieces, activePieceCellRef);

	map(potentialMoves, function(potentialMove, i){

		updatedPieces[potentialMove] = { cellRef: potentialMove, type: 'landing', selected: false };
		
 	});

	return updatedPieces;

};


// Move a piece
const moveActivePiece = function(pieces, landingPieceCellRef){

	let selectedPiece = findWhere(pieces, { selected: true });

	if(selectedPiece){

		let updatedPieces = omit(pieces, function(value, key, object) {
  			return value.type === 'landing' || value.selected === true;
		});

		selectedPiece['selected'] = false;
		updatedPieces[landingPieceCellRef] = selectedPiece;

		return updatedPieces;

	}

	return pieces;

};


// Move a piece
const setActivePieces = function(pieces, activePlayer){

	let updatedPieces = Object.assign({}, pieces);

	for (var piece in updatedPieces) {
		if (updatedPieces.hasOwnProperty(piece)) { 
			updatedPieces[piece]['active'] = (updatedPieces[piece]['player'] === activePlayer && availableMoves(pieces, updatedPieces[piece]['cellRef']).length) ? true : false;
		} 
	}

	return updatedPieces;

};


export { availableMoves, unselectAllPieces, selectPiece, setActivePieces, moveActivePiece };
