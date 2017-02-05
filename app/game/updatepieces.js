import { map } from 'underscore';

var getMatchingSquare = function(square1, square2) {
  if(square1.cellRef.row === square2.cellRef.row && square1.cellRef.col === square2.cellRef.row){
    return true;
  };
  return false;
};

// Calculate the moves available to a piece
var availableMoves = function(pieces, activePiece){

	const type = activePiece.type;
	const player = activePiece.player;
	const cellRef = activePiece.cellRef;
	
	let potentialMoves = [];

	if(player > 0){

		const directionOfPlay = player === 1 ? +1 : -1;
		const reverseDirectionOfPlay = player === 1 ? -1 : +1;
		let impossibleMoves = [];
		let z;

		potentialMoves = [
			{ cellRef: { col: cellRef.col + 1, row: cellRef.row + directionOfPlay }},
			{ cellRef: { col: cellRef.col - 1, row: cellRef.row + directionOfPlay }}
		];

		if(type === 'king'){

			potentialMoves.push({ cellRef: { col: cellRef.col + 1, row: cellRef.row + reverseDirectionOfPlay }});
			potentialMoves.push({ cellRef: { col: cellRef.col - 1, row: cellRef.row + reverseDirectionOfPlay }});

		}

		map(pieces, function(piece, i){

			map(potentialMoves, function(potentialMove, j){

				if(getMatchingSquare(piece, potentialMove)){
					if(piece.player === player){
						impossibleMoves.push(j);
					}
				}

			});

		});

		while((z = impossibleMoves.pop()) != null){
    		potentialMoves.splice(z, 1);
		}

	}

	return potentialMoves;

};

// Unselect all pieces
var unselectAllPieces = function(pieces){
	
   	map(pieces, function(piece, i){

   		piece.selected = false;

  	});

	return pieces;

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

