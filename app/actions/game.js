/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

export function setGameType(type) {
  return {
    type: types.CHANGE_GAME_TYPE,
    gridSize: type.gridSize,
    startingPieceCount: type.pieces
  }
}

export function startGame() {
  return {
    type: types.START_GAME
  }
}
