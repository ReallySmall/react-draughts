import {map} from "underscore";
import matchingSquare from 'helpers/pieces';

// Calculate the moves available to a piece
function availableMoves(pieces, activePiece){

	let squaresToHighlight = [];

   	map(pieces, function(piece, i){

   		if(matchingSquare(piece, activePiece)){
   			// TODO
   			// get row and col indexes of piece
   			// get type of piece - can it move in both directions
   			// get player
   			// get state of closest diagonal squares
   			// Can the piece move forwards or jump over an opposin piece? 
   		}

  	});

	return pieces;

};

// Unselect all pieces
function unselectAllPieces(pieces){
	
   	map(pieces, function(piece, i){

   		piece.selected = false;

  	});

	return pieces;

};

// Select a piece
function selectPiece(pieces, activePiece){

   	map(pieces, function(piece, i){

   		piece.selected = matchingSquare(piece, activePiece) ? true : false;

  	});

	return pieces;

};

export { availableMoves, unselectAllPieces, selectPiece };

