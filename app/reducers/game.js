import { createGrid, createPieces } from 'game/setuppieces';
import { availableMoves, unselectAllPieces, selectPiece, setActivePieces, moveActivePiece } from 'game/updatepieces';
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
  activePlayer: null,
  players: ['Player 1', 'Player 2'],
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
        activePlayer: 0,
        history: ['New game started', ...state.history],
        pieces: setActivePieces(state.pieces, 0)
      });

    case CREATE_PIECE_COLLECTION:
      return Object.assign({}, state, {
        pieces: createPieces(state.gridSize, state.startingPieceCount)
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
        history: ['Player ' + state.activePlayer + ' moved a piece', ...state.history],
        activePlayer: state.activePlayer === 0 ? 1 : 0
      });

    default:
      return state;

  }
}
