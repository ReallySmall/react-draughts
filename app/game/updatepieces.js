import { map } from 'underscore';


var getMatchingSquare = function(square1, square2) {
  if(square1.cellRef.row === square2.cellRef.row && square1.cellRef.col === square2.cellRef.row){
    return true;
  };
  return false;
};


// Calculate the potential moves a piece could make
var potentialMoves = function(activePiece){

	const type = activePiece.type;
	const player = activePiece.player;
	const cellRef = activePiece.cellRef;
	const directionOfPlay = player === 1 ? +1 : -1;
	const reverseDirectionOfPlay = player === 1 ? -1 : +1;

	let potentialMoves = [
		{ cellRef: { col: cellRef.col + 1, row: cellRef.row + directionOfPlay }},
		{ cellRef: { col: cellRef.col - 1, row: cellRef.row + directionOfPlay }}
	];

	if(type === 'king'){

		potentialMoves.push({ cellRef: { col: cellRef.col + 1, row: cellRef.row + reverseDirectionOfPlay }});
		potentialMoves.push({ cellRef: { col: cellRef.col - 1, row: cellRef.row + reverseDirectionOfPlay }});

	}

	return potentialMoves;

};


// Calculate the moves available to a piece
var availableMoves = function(pieces, activePiece){

	const type = activePiece.type;
	const player = activePiece.player;
	const otherPlayer = player === 1? 2: 1;
	const cellRef = activePiece.cellRef;
	
	let availableSingleMoves = potentialMoves(activePiece);
	let availableScoringMoves = [];
	let allAvailableMoves = [];
	let impossibleMoves = [];
	let z;

	map(pieces, function(piece, i){ // check if the adjacent diagonal squares are empty

		map(availableSingleMoves, function(availableSingleMove, j){

			if(getMatchingSquare(piece, availableSingleMove)){
				if(piece.player > 0){ // can't land on another piece
					impossibleMoves.push(j);
					if(piece.player === otherPlayer){ // if square occupied by opposing piece
						//availableScoringMoves.push(potentialMoves(piece)) // check if square behind it is empty
					}
				}
			}

		});

	});

	if(availableScoringMoves.length){ // check if the diagonal square behind an adjacent opposing piece is empty

		map(pieces, function(piece, i){ // check if the adjacent diagonal squares are empty

			map(availableScoringMoves, function(availableScoringMove, k){

				if(getMatchingSquare(piece, availableScoringMove)){
					if(piece.player > 0){ // can't land on another piece
						impossibleMoves.push(k);
					}
				}

			});

		});

	}

	allAvailableMoves = [...availableSingleMoves, ...availableScoringMoves];

	while((z = impossibleMoves.pop()) != null){ // remove all the impossible moves from the list of potential moves
		allAvailableMoves.splice(z, 1);
	}

	return allAvailableMoves;

};


// Unselect all pieces
var unselectAllPieces = function(pieces){

	let updatedPieces = [];
	
   	map(pieces, function(piece, i){

   		let updatedPiece = piece;
   		updatedPiece.selected = false;
   		updatedPieces.push(updatedPiece);

  	});

	return updatedPieces;

};


// Select a piece
var selectPiece = function(pieces, activePiece){

	let updatedPieces = [];
	let potentialMoves = [];

   	map(pieces, function(piece, i){

   		if(piece.type !== 'landing'){

	   		if(getMatchingSquare(piece, activePiece)){
		   		piece.selected = true;
		   		potentialMoves = availableMoves(pieces, piece);
	   		} else {
	   			piece.selected = false;
	   		}

	   		updatedPieces.push(piece);

   		}

  	});

	map(potentialMoves, function(potentialMove, i){

		potentialMove.type = 'landing';
		potentialMove.selected = false;
		
		updatedPieces.push(potentialMove);

  	});

	return updatedPieces;

};


// Move a piece
var moveActivePiece = function(pieces, landingPiece){

	let updatedPieces = [];

	map(pieces, function(piece, i){

   		if(piece.selected){

   			piece.selected = false;
   			piece.cellRef = landingPiece.cellRef;

   		}

   		if(piece.type !== 'landing'){

   			updatedPieces.push(piece);

   		}

  	});
	
	return updatedPieces;

};

export { getMatchingSquare, availableMoves, unselectAllPieces, selectPiece, moveActivePiece };
