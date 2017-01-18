import {
  CHANGE_GAME_TYPE,
  SET_ACTIVE_PLAYER,
  START_GAME,
  END_GAME,
  UPDATE_GAME_HISTORY } from 'constants/index';

export default function game(state = {
  gridSize: 8,
  startingPieceCount: 12,
  activePlayer: 0,
  started: false,
  lastMove: null,
  moves: 0
}, action) {
  switch (action.type) {
    case CHANGE_GAME_TYPE:
      return Object.assign({}, state, {
        gridSize: action.gridSize,
        startingPieceCount: action.startingPieceCount
      });
    case START_GAME:
      return Object.assign({}, state, {
        started: true,
        activePlayer: 1,
        lastMove: 'New game started'
      });
    default:
      return state;
  }
}
