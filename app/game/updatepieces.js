import { map, reject } from 'underscore';

var getMatchingSquare = function(square1, square2) {
  if(square1.cellRef.row === square2.cellRef.row && square1.cellRef.col === square2.cellRef.row){
    return true;
  };
  return false;
};

// Calculate the moves available to a piece
var availableMoves = function(pieces, activePiece, gridSize){

	const type = activePiece.type;
	const player = activePiece.player;
	const cellRef = activePiece.cellRef;
	
	let theoreticalNextSquareCellRefs = [];
	let hasAvailableMoves = true;

	if(player > 0){

		const directionOfPlay = player === 1 ? +1 : -1;
		const reverseDirectionOfPlay = player === 1 ? -1 : +1;

		theoreticalNextSquareCellRefs.push({ cellRef: { col: cellRef.col + 1, row: cellRef.row + directionOfPlay }});
		theoreticalNextSquareCellRefs.push({ cellRef: { col: cellRef.col - 1, row: cellRef.row + directionOfPlay }});

		if(type === 'king'){

			theoreticalNextSquareCellRefs.push({ cellRef: { col: cellRef.col + 1, row: cellRef.row + reverseDirectionOfPlay }});
			theoreticalNextSquareCellRefs.push({ cellRef: { col: cellRef.col - 1, row: cellRef.row + reverseDirectionOfPlay }});

		}

		map(pieces, function(piece, i){

			for(let i = 0; i < theoreticalNextSquareCellRefs.length; i++){

				const item = theoreticalNextSquareCellRefs[i];

				if(getMatchingSquare(piece, item)){

					if(piece.player === player){
						hasAvailableMoves = false;
					} else {
						// TODO
						// find out if square beyond is empty
					}

				}

			}

		});

	}

	if(hasAvailableMoves){
		return true;
	}

	return false;

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

   	map(pieces, function(piece, i){

   		piece.selected = getMatchingSquare(piece, activePiece) ? true : false;

  	});

	return pieces;

};

export { getMatchingSquare, availableMoves, unselectAllPieces, selectPiece };

