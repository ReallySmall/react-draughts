/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import md5 from 'spark-md5';
import * as types from 'constants/index';
import { availableMoves, unselectAllPieces, selectPiece } from 'logic/updatepieces';

polyfill();

// Clear any current piece selections
export function clearPieceSelections(pieces) {

	return {
		type: types.CLEAR_PIECE_SELECTIONS,
		pieces: unselectAllPieces(pieces)
	}

}

// Clear any current piece selections and enable selection on current piece
export function setPieceSelection(pieces, piece) {

	return {
		type: types.SET_PIECE_SELECTION,
		pieces: selectPiece(pieces, piece)
	}

}
