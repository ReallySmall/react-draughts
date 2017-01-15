/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

function pieceSelection(pieces, piece){
	
	let updatedPieces = [];

	for(let = i; i < pieces.length; i++){
		let currentPiece = pieces[i];
		currentPiece.selected = false;
		updatedPieces.push(currentPiece);
	}

	return updatedPieces;

}

// Clear any current piece selections
export function clearPieceSelections(pieces) {
  return {
    type: types.CLEAR_PIECE_SELECTIONS,
    pieces: pieceSelection(pieces)
  }
}

// Clear any current piece selections and enable selction on current piece
export function setPieceSelection(pieces, piece) {
  return {
    type: types.SET_PIECE_SELECTION,
    pieces: pieceSelection(pieces, piece)
  }
}
