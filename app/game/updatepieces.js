import { gridRefStringToNumericalArray, gridRefNumericalArrayToString } from 'game/helpers';
import { omit, findWhere, map, mapObject } from 'underscore';

// Calculate the potential moves a piece could make
const potentialMoves = function(pieces, activePieceCellRef, invert = false){

	const activePiece = pieces[activePieceCellRef]; // the piece passed in
	let potentialMoves = []; // list of potential moves to populate and return

	if(activePiece){ // if the piece requested exists

		const { type, player } = activePiece; // type and owning player of the active piece
		const cellRef = gridRefStringToNumericalArray(activePiece.cellRef);
		const baseDirection = invert === true ? 1 : 0;
		const directionOfPlay = player === baseDirection ? +1 : -1;
		const reverseDirectionOfPlay = player === baseDirection ? -1 : +1;

		const forward = cellRef[0] + directionOfPlay; // the next row in the direction of the enemy starting point
		const backward = cellRef[0] + reverseDirectionOfPlay; // the previous row in the direction of the enemy starting point
		const left = cellRef[1] - 1; // the col to the left
		const right = cellRef[1] + 1; // the col to the right

		potentialMoves.push(gridRefNumericalArrayToString([forward, left])); // potential move
		potentialMoves.push(gridRefNumericalArrayToString([forward, right])); // potential move

		if(type === 'king'){

			potentialMoves.push(gridRefNumericalArrayToString([backward, left])); // potential move
			potentialMoves.push(gridRefNumericalArrayToString([backward, right])); // potential move

		}

	}

	return potentialMoves; // return all potential moves

};


// Calculate the actual moves available to a piece
const availableMoves = function(pieces, activePieceCellRef){

	const activePiece = pieces[activePieceCellRef]; // the piece passed in
	
	let availableMoves = []; // array to return

	if(activePiece){ // if the piece requested exists

		const player = activePiece.player; // the player owning the active piece
		const activePieceColIndex = gridRefStringToNumericalArray(activePiece.cellRef)[1]; // the col index of the active piece
		
		map(potentialMoves(pieces, activePieceCellRef), function(potentialMove, j){ // fetch and loop though potential moves available to the active piece

			const piece = pieces[potentialMove]; // check whether the potential move square contains a piece
			const singleMove = potentialMove;

			if(!piece){ // if the square is empty

				availableMoves.push({
					move: potentialMove,
					captures: null
				}); // this is a move the active piece can make

			} else if(piece && piece.player !== player){ // otherwise if the square contains an enemy piece, then check if the square beyond it is empty, allowing a capture

				const pieceColIndex = gridRefStringToNumericalArray(piece.cellRef)[1]; // the col index of the enemy piece

				map(potentialMoves(pieces, piece.cellRef, true), function(potentialCaptureMove, k){ // fetch state of squares behind the enemy piece

					let farPiece = pieces[potentialCaptureMove]; // check whether the potential move square contains a piece
					const farPieceColIndex = gridRefStringToNumericalArray(potentialCaptureMove)[1]; // the col index of the far square 

					if(!farPiece){ // if the square is empty

						if((pieceColIndex > activePieceColIndex && farPieceColIndex > pieceColIndex) || (pieceColIndex < activePieceColIndex && farPieceColIndex < pieceColIndex)){

							availableMoves.push({
								move: potentialCaptureMove,
								captures: piece.cellRef
							});

						}

					}

				});
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
	let potentialMoves = availableMoves(updatedPieces, activePieceCellRef);
	
	const { player } = updatedPieces[activePieceCellRef];

	updatedPieces[activePieceCellRef]['selected'] = true;
	
	map(potentialMoves, function(potentialMove, i){

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


// Move an active piece to a new square
const moveActivePiece = function(pieces, landingPieceCellRef, gridSize){

	console.log(pieces[landingPieceCellRef]);

	const capturedPiece = pieces[landingPieceCellRef].captures;
	let selectedPiece = findWhere(pieces, { selected: true }); // find and cache the active piece data

	if(selectedPiece){

		let updatedPieces = omit(pieces, function(piece) { // remove the active, captured and landing pieces

			const { type, selected, cellRef } = piece;
  			return type === 'landing' || selected === true || cellRef === capturedPiece;

		});

		selectedPiece['selected'] = false; // update property of cached active piece
		selectedPiece['cellRef'] = landingPieceCellRef; // update property of cached active piece

		updatedPieces[landingPieceCellRef] = selectedPiece; // set the active piece from cached object

		return updatedPieces;

	}

	return pieces;

};


// Set pieces for the current player which have available moves as active
const setActivePieces = function(pieces, activePlayer){

	let updatedPieces = mapObject(pieces, function (piece) {

		const moves = availableMoves(pieces, piece.cellRef);

		piece.active = piece.player === activePlayer && moves.length ? true : false;

		return piece;

	});

	return updatedPieces;

};


export { availableMoves, unselectAllPieces, selectPiece, setActivePieces, moveActivePiece };
