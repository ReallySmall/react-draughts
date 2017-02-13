import { createGameHistoryEntry, toFriendlyGridRef, gridRefStringToNumericalArray, gridRefNumericalArrayToString } from 'game/helpers';
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
  startingPieceCount: defaultStartingPieceCount,
  activePlayer: 0,
  players: [
    { name: 'Player 1', pieces: defaultStartingPieceCount }, 
    { name: 'Player 2', pieces: defaultStartingPieceCount } 
  ],
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
        players: [
          { name: 'Player 1', pieces: action.req.data.initialPieces }, 
          { name: 'Player 2', pieces: action.req.data.initialPieces } 
        ],
        startingPieceCount: action.req.data.initialPieces,
        rules: action.req.data.rules,
        pieces: createPieces(action.req.data.gridSize, action.req.data.initialPieces)
      });

    case START_GAME:

      let startGameMessage = [createGameHistoryEntry('New game started'), ...state.history];

      startGameMessage = [createGameHistoryEntry(state.players[state.activePlayer]['name'] + ' - it\'s your turn', state.activePlayer), ...startGameMessage]

      return Object.assign({}, state, {
        started: true,
        activePlayer: 0,
        history: startGameMessage,
        pieces: setActivePieces(state.pieces, 0)
      });

    case CREATE_PIECE_COLLECTION:
      return Object.assign({}, state, {
        pieces: createPieces(state.gridSize, state.startingPieceCount)
      });

    case SET_PIECE_SELECTION:
      return Object.assign({}, state, {
        pieces: selectPiece(state.pieces, action.cellRef)
      });

    case CLEAR_PIECE_SELECTIONS:
      return Object.assign({}, state, {
        pieces: unselectAllPieces(state.pieces)
      });

    case MOVE_ACTIVE_PIECE:

      let updatedPieces = moveActivePiece(state.pieces, action.cellRef); // move the piece
      let nextPlayer = state.activePlayer === 0 ? 1 : 0; // TODO work out whether current player's turn is over
      let pieceMoveMessage = [createGameHistoryEntry(state.players[state.activePlayer]['name'] + ' moved to ' + toFriendlyGridRef(action.cellRef), state.activePlayer), ...state.history];

      updatedPieces = setActivePieces(updatedPieces, nextPlayer); // set the active pieces for the next move
      pieceMoveMessage = [createGameHistoryEntry(state.players[nextPlayer]['name'] + ' - it\'s your turn', nextPlayer), ...pieceMoveMessage];      

      return Object.assign({}, state, {
        pieces: updatedPieces,
        history: pieceMoveMessage,
        activePlayer: nextPlayer
      });

    default:
      return state;

  }
}
