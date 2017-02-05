import { createGrid, createPieces } from 'game/setuppieces';
import { availableMoves, unselectAllPieces, selectPiece, moveActivePiece } from 'game/updatepieces';
import {
  CHANGE_GAME_TYPE_SUCCESS,
  SET_ACTIVE_PLAYER,
  START_GAME,
  END_GAME,
  UPDATE_GAME_HISTORY,
  SET_PIECE_SELECTION,
  CLEAR_PIECE_SELECTIONS,
  CREATE_PIECE_COLLECTION,
  MOVE_ACTIVE_PIECE } from 'constants/index';

const defaultGridSize = 8;
const defaultStartingPieceCount = 12;

export default function game(state = {
  grid: createGrid(defaultGridSize),
  gridSize: 8,
  startingPieceCount: 12,
  activePlayer: 0,
  started: false,
  history: [],
  moves: 0,
  pieces: createPieces(defaultGridSize, defaultStartingPieceCount)
}, action) {
  switch (action.type) {

    case CHANGE_GAME_TYPE_SUCCESS:
      return Object.assign({}, state, {
        grid: createGrid(action.req.data.gridSize),
        gridSize: action.req.data.gridSize,
        startingPieceCount: action.req.data.initialPieces,
        rules: action.req.data.rules,
        pieces: createPieces(action.req.data.gridSize, action.req.data.initialPieces)
      });

    case START_GAME:
      return Object.assign({}, state, {
        started: true,
        activePlayer: 1,
        history: [...state.history, 'New game started']
      });

    case CREATE_PIECE_COLLECTION:
      return Object.assign({}, state, {
        pieces: createPieces(gridSize, startingPieceCount)
      });

    case SET_PIECE_SELECTION:
      return Object.assign({}, state, {
        pieces: selectPiece(state.pieces, action.piece)
      });

    case CLEAR_PIECE_SELECTIONS:
      return Object.assign({}, state, {
        pieces: unselectAllPieces(state.pieces)
      });

    case MOVE_ACTIVE_PIECE:
      return Object.assign({}, state, {
        pieces: moveActivePiece(state.pieces, action.piece),
        history: [...state.history, 'Player' + state.activePlayer + 'did an awesome move'],
        activePlayer: state.activePlayer === 1 ? 2 : 1
      });

    default:
      return state;

  }
}
