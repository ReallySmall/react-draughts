import { gridRefStringToNumericalArray, gridRefNumericalArrayToString } from 'game/helpers';
import { unselectAllPieces, selectPiece, setActivePieces } from 'game/selectpieces';
import { omit, filter, findWhere, map, mapObject } from 'underscore';

// 
const isInGrid = (gridIndex, gridSize) => {

	if(gridIndex >= 0 && gridIndex < gridSize){
		return true;
	}

	return false

};


// Calculate the potential moves a piece could make
const potentialMoves = (pieces, activePieceCellRef, gridSize, invert = false) => {

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

		if(isInGrid(forward, gridSize) && isInGrid(left, gridSize)){
			potentialMoves.push(gridRefNumericalArrayToString([forward, left])); // potential move
		}
		if(isInGrid(forward, gridSize) && isInGrid(right, gridSize)){
			potentialMoves.push(gridRefNumericalArrayToString([forward, right])); // potential move
		}

		if(type === 'king'){

			if(isInGrid(backward, gridSize) && isInGrid(left, gridSize)){
				potentialMoves.push(gridRefNumericalArrayToString([backward, left])); // potential move
			}
			if(isInGrid(forward, gridSize) && isInGrid(right, gridSize)){
				potentialMoves.push(gridRefNumericalArrayToString([backward, right])); // potential move
			}

		}

	}

	return potentialMoves; // return all potential moves

};


// Calculate the actual moves available to a piece
const availableMoves = (pieces, activePieceCellRef, gridSize) => {

	const activePiece = pieces[activePieceCellRef]; // the piece passed in
	let hasCaptureMoves = false; // track whether there are capturing moves the player must make
	
	let availableMoves = []; // array to return

	if(activePiece){ // if the piece requested exists

		const player = activePiece.player; // the player owning the active piece
		const activePieceColIndex = gridRefStringToNumericalArray(activePiece.cellRef)[1]; // the col index of the active piece
		
		map(potentialMoves(pieces, activePieceCellRef, gridSize), (potentialMove, j) => { // fetch and loop though potential moves available to the active piece

			const piece = pieces[potentialMove]; // check whether the potential move square contains a piece
			const singleMove = potentialMove;

			if(!piece){ // if the square is empty

				availableMoves.push({
					move: potentialMove,
					captures: null
				}); // this is a move the active piece can make

			} else if(piece && piece.player !== player){ // otherwise if the square contains an enemy piece, then check if the square beyond it is empty, allowing a capture

				const pieceColIndex = gridRefStringToNumericalArray(piece.cellRef)[1]; // the col index of the enemy piece

				map(potentialMoves(pieces, piece.cellRef, gridSize, true), (potentialCaptureMove, k) => { // fetch state of squares behind the enemy piece

					let farPiece = pieces[potentialCaptureMove]; // check whether the potential move square contains a piece
					const farPieceColIndex = gridRefStringToNumericalArray(potentialCaptureMove)[1]; // the col index of the far square 

					if(!farPiece){ // if the square is empty

						if((pieceColIndex > activePieceColIndex && farPieceColIndex > pieceColIndex) || (pieceColIndex < activePieceColIndex && farPieceColIndex < pieceColIndex)){

							availableMoves.push({
								move: potentialCaptureMove,
								captures: piece.cellRef
							});

							hasCaptureMoves = true;

						}

					}

				});
			}

		});

	}

	if(hasCaptureMoves){ // if piece has any capture moves available, remove all non capturing moves
		availableMoves = filter(availableMoves, (availableMove) => { 
			return (availableMove.captures !== null && availableMove.captures.length); 
		});
	}

	return availableMoves;

};


// Move an active piece to a new square, capturing an enemy piece if possible
const moveActivePiece = function(pieces, landingPieceCellRef, gridSize){

	const capturedPiece = pieces[landingPieceCellRef].captures; // any pieces that will be captured moving to this square

	let selectedPiece = findWhere(pieces, { selected: true }); // find and cache the active piece data
	let turnComplete = true; // assume it's a single move turn

	if(selectedPiece){

		let updatedPieces = omit(pieces, (piece) => { // remove the active, captured and landing pieces

			if(piece){
				const { type, selected, cellRef } = piece;
	  			return type === 'landing' || selected === true || cellRef === capturedPiece;
  			}

		});

		selectedPiece['selected'] = false; // update property of cached active piece
		selectedPiece['cellRef'] = landingPieceCellRef; // update property of cached active piece

		updatedPieces[landingPieceCellRef] = selectedPiece; // set the active piece from cached object

		if(capturedPiece){ // if a piece was captured

			map(availableMoves(updatedPieces, landingPieceCellRef, gridSize), (potentialMove, i) => {

				if(potentialMove.captures !== null){
					updatedPieces[landingPieceCellRef]['active'] = true;
					updatedPieces[landingPieceCellRef]['selected'] = true;
					updatedPieces = selectPiece(updatedPieces, landingPieceCellRef);
					turnComplete = false;
				}
				
		 	});
		 	
		}

		return {
			captures: capturedPiece,
			pieces: updatedPieces,
			turnComplete: turnComplete
		}

	}

	return pieces;

};


export { potentialMoves, availableMoves, moveActivePiece };