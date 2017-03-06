/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

// Create a new piece collection
export function createPieceCollection() {

	return {
		type: types.CREATE_PIECE_COLLECTION
	}

};

// Clear any current piece selections
export function clearPieceSelections() {

	return {
		type: types.CLEAR_PIECE_SELECTIONS
	}

};

// Clear any current piece selections and enable selection on current piece
export function setPieceSelection(cellRef) {

	return {
		type: types.SET_PIECE_SELECTION,
		cellRef: cellRef
	}

};

// Move the active piece to the clicked position
export function moveActivePieceToHere(cellRef) {

	return {
		type: types.MOVE_ACTIVE_PIECE,
		cellRef: cellRef
	}

};