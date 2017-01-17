import {
  UPDATE_PIECES } from 'constants/index';

export default function pieces(state = {
  pieces: []
}, action) {
  switch (action.type) {
    case UPDATE_PIECES:
      return Object.assign({}, state, {
        pieces: action.pieces
      });
    default:
      return state;
  }
}
