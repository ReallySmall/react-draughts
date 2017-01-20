import {
  SET_PIECE_SELECTION,
  CLEAR_PIECE_SELECTIONS } from 'constants/index';

export default function pieces(state = {
  pieces: []
}, action) {
  switch (action.type) {
    case SET_PIECE_SELECTION:
      return Object.assign({}, state, {
        pieces: action.pieces
      });
    case CLEAR_PIECE_SELECTIONS:
      return Object.assign({}, state, {
        pieces: action.pieces
      });
    default:
      return state;
  }
}
