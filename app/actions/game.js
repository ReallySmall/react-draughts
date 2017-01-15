/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

// Fetch wrapper logic
export function changeGridSize() {
  return {
    type: types.CHANGE_GRID_SIZE,
    gridSize: 8
  }
}
