/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

let API_ENDPOINT = '/api/gametypes';

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
function makeGameTypeRequest(method, id, data) {
  return request[method](API_ENDPOINT + (id ? ('/' + id) : ''), data);
}

export function setGameType(typeId) {
  return {
    type: types.CHANGE_GAME_TYPE,
    promise: makeGameTypeRequest('get', typeId)
  }
}

export function startGame(settings) {
  return {
    type: types.START_GAME,
    settings: settings
  }
}

export function endGame() {
  return {
    type: types.END_GAME
  }
}
