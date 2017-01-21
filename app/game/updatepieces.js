import { map, reject } from 'underscore';

var getMatchingSquare = function(square1, square2) {
  if(square1.cellRef.row === square2.cellRef.row && square1.cellRef.col === square2.cellRef.row){
    return true;
  };
  return false;
};

// Calculate the moves available to a piece
var availableMoves = function(pieces, activePiece, gridSize){

	let availableNextSquareCellRefs = [];

 	map(pieces, function(piece, i){

	 	if(getMatchingSquare(piece, activePiece)){
	 			// TODO
	      const type = piece.type;
	      const player = piece.player;

	      if(player > 0){

	        const directionOfPlay = player === 1 ? -1 : +1;
	        const reverseDirectionOfPlay = player === 1 ? +1 : -1;
	        const { row, col } = piece.cellRef;

	        let nextSquareCellRefs = [
	          { cellRef: { row: row + directionOfPlay, col: col -1 }},
	          { cellRef: { row: row + directionOfPlay, col: col +1 }}
	        ];

	        if(type === 'king'){
	          nextSquareCellRefs.push({cellRef: { row: row + reverseDirectionOfPlay, col: col -1 }});
	          nextSquareCellRefs.push({cellRef: { row: row + reverseDirectionOfPlay, col: col +1 }});
	        }

	        var filteredNextSquareCellRefs = reject(nextSquareCellRefs, function(cellRef) { 
	          return (cellRef.row < 0 || cellRef.row >= gridSize || cellRef.col < 0 || cellRef.col >= gridSize); 
	        });

	        map(pieces, function(piece, i){
	        	for(var j = 0; j < filteredNextSquareCellRefs.length; j++){
	        		if(getMatchingSquare(piece, filteredNextSquareCellRefs[j]) && filteredNextSquareCellRefs[j].type !== 'pawn' && filteredNextSquareCellRefs[j].type !== 'king'){
	        			availableNextSquareCellRefs.push(filteredNextSquareCellRefs[j]);
	        		}
	        	}
	        });

	        console.log(availableNextSquareCellRefs);

	      }

 		}

	});

	if(availableNextSquareCellRefs.length){
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

