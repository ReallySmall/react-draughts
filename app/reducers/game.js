import { createGameHistoryEntry, toFriendlyGridRef, gridRefStringToNumericalArray, gridRefNumericalArrayToString } from 'game/helpers';
import { createGrid, createPieces } from 'game/setuppieces';
import { availableMoves, moveActivePiece } from 'game/movepieces';
import { unselectAllPieces, selectPiece, setActivePieces } from 'game/selectpieces';

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

      startGameMessage = [createGameHistoryEntry(state.players[state.activePlayer]['name'] + ' - it\'s your move', state.activePlayer), ...startGameMessage]

      return Object.assign({}, state, {
        started: true,
        activePlayer: 0,
        history: startGameMessage,
        pieces: setActivePieces(state.pieces, 0, state.gridSize).pieces
      });

    case CREATE_PIECE_COLLECTION:
      return Object.assign({}, state, {
        pieces: createPieces(state.gridSize, state.startingPieceCount)
      });

    case SET_PIECE_SELECTION:
      return Object.assign({}, state, {
        pieces: selectPiece(state.pieces, action.cellRef, state.gridSize)
      });

    case CLEAR_PIECE_SELECTIONS:
      return Object.assign({}, state, {
        pieces: unselectAllPieces(state.pieces)
      });

    case MOVE_ACTIVE_PIECE:

      const move = moveActivePiece(state.pieces, action.cellRef, state.gridSize); // move the piece
      const { captures, pieces, turnComplete } = move; // key data from the move
      const otherPlayer = state.activePlayer === 0 ? 1 : 0; // set active player to other player

      let updatedPieces = pieces; // pieces to assign back to state
      let playerData = state.players;
      let pieceMoveMessage;
      let nextPlayer = otherPlayer;

      if(captures){ // if the move captured a piece

        playerData[otherPlayer].pieces = playerData[otherPlayer].pieces - 1;
        pieceMoveMessage = [createGameHistoryEntry(state.players[state.activePlayer]['name'] + ' moved to ' + toFriendlyGridRef(action.cellRef) + ' and captured a piece', state.activePlayer), ...state.history];
      
      } else { // if the move didn't capture a piece

        pieceMoveMessage = [createGameHistoryEntry(state.players[state.activePlayer]['name'] + ' moved to ' + toFriendlyGridRef(action.cellRef), state.activePlayer), ...state.history];
      
      }

      if(turnComplete){ // if there are no subsequent mandatory captures

        const activePieces = setActivePieces(updatedPieces, nextPlayer, state.gridSize);

        updatedPieces = activePieces.pieces; // set the active pieces for the next move
        pieceMoveMessage = [createGameHistoryEntry(state.players[otherPlayer]['name'] + ' - it\'s your move', otherPlayer), ...pieceMoveMessage];

        if(activePieces.captures === true){

          pieceMoveMessage = [createGameHistoryEntry(state.players[otherPlayer]['name'] + ' - you must capture a piece', otherPlayer), ...pieceMoveMessage];
        
        }

      } else {

        nextPlayer = state.activePlayer;
        pieceMoveMessage = [createGameHistoryEntry(state.players[state.activePlayer]['name'] + ' - you must make another move', state.activePlayer), ...pieceMoveMessage];
      
      }

      return Object.assign({}, state, {
        pieces: updatedPieces,
        players: playerData,
        history: pieceMoveMessage,
        activePlayer: nextPlayer,
        moves: state.moves + 1
      });

    default:
      return state;

  }
}
