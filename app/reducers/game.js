import {
  CHANGE_GRID_SIZE,
  SET_ACTIVE_PLAYER,
  START_GAME,
  END_GAME,
  UPDATE_GAME_HISTORY } from 'constants/index';

export default function game(state = {
  gridSize: 8,
  activePlayer: 0,
  started: false,
  lastMove: null
}, action) {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, {
        started: true,
        activePlayer: 1
      });
    default:
      return state;
  }
}
