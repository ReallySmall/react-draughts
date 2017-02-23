import { canCoronate, gridRefStringToNumericalArray, gridRefNumericalArrayToString, inMovementPlane, invertPlayDirection } from 'game/helpers';
import { unselectAllPieces, selectPiece, setActivePieces } from 'game/selectpieces';
import { omit, filter, findWhere, map, mapObject } from 'underscore';

// 
const isInGrid = (gridIndex, gridSize) => {

	if(gridIndex >= 0 && gridIndex < gridSize){
		return true;
	}

	return false;

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

			if(isInGrid(backward, gridSize) && isInGrid(right, gridSize)){
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
		
		map(potentialMoves(pieces, activePieceCellRef, gridSize), (potentialMove, j) => { // fetch and loop though potential moves available to the active piece

			const piece = pieces[potentialMove]; // check whether the potential move square contains a piece

			if(!piece){ // if the square is empty

				availableMoves.push({
					move: potentialMove,
					captures: null
				}); // this is a move the active piece can make

			} else if(piece && piece.player !== player){ // otherwise if the square contains an enemy piece, then check if the square beyond it is empty, allowing a capture

				const invert = invertPlayDirection(activePiece, piece);

				map(potentialMoves(pieces, piece.cellRef, gridSize, invert), (potentialCaptureMove, k) => { // fetch state of squares behind the enemy piece

					if(!pieces[potentialCaptureMove] && inMovementPlane(activePiece.cellRef, piece.cellRef, potentialCaptureMove)){ // if the square is empty

						availableMoves.push({
							move: potentialCaptureMove,
							captures: piece.cellRef
						}); // this is a move the active piece can make, capturing an opponent in the process

						hasCaptureMoves = true;

					}

				});
			}

		});

	}

	if(hasCaptureMoves){ // if piece has any capture moves available, only return those
		availableMoves = availableMoves.filter((availableMove) => { 
			return availableMove.captures; 
		});
	}

	return availableMoves;

};


// Move an active piece to a new square, capturing an enemy piece if possible
const moveActivePiece = (pieces, landingPieceCellRef, gridSize) => {

	const capturedPiece = pieces[landingPieceCellRef].captures; // any pieces that will be captured moving to this square

	let selectedPiece = findWhere(pieces, { selected: true }); // find and cache the active piece data
	let turnComplete = true; // assume it's a single move turn
	let coronated = false;

	if(selectedPiece){

		let updatedPieces = omit(pieces, (piece) => { // remove the active, captured and landing pieces

			if(piece){
				const { type, selected, cellRef } = piece;
	  			return type === 'landing' || selected === true || cellRef === capturedPiece;
  			}

		});

		selectedPiece['selected'] = false; // update property of cached active piece
		selectedPiece['cellRef'] = landingPieceCellRef; // update property of cached active piece

		if(canCoronate(landingPieceCellRef, selectedPiece['player'], gridSize) && selectedPiece['type'] !== 'king'){
			selectedPiece['type'] = 'king';
			coronated = true;
		}

		updatedPieces[landingPieceCellRef] = selectedPiece; // set the active piece from cached object

		if(capturedPiece){ // if a piece was captured

			map(availableMoves(updatedPieces, landingPieceCellRef, gridSize), (potentialMove, i) => {

				if(potentialMove.captures !== null){
					updatedPieces[landingPieceCellRef]['active'] = true;
					updatedPieces[landingPieceCellRef]['selected'] = true;
					updatedPieces = selectPiece(updatedPieces, landingPieceCellRef, gridSize);
					turnComplete = false;
				}
				
		 	});
		 	
		}

		return {
			captures: capturedPiece,
			coronated: coronated,
			pieces: updatedPieces,
			turnComplete: turnComplete
		}

	}

	return pieces;

};


export { potentialMoves, availableMoves, moveActivePiece };