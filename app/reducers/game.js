import { createGrid } from 'game/setuppieces';
import Pieces from 'classes/pieces';
import GameHistory from 'classes/history';

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
const gamePieces = new Pieces(defaultGridSize);
const gameMessages = new GameHistory();

export default function game(state = {

  grid: createGrid(defaultGridSize),
  gridSize: defaultGridSize,
  startingPieceCount: defaultStartingPieceCount,
  activePlayer: 0,
  players: [
    { name: 'Player 1', pieces: defaultStartingPieceCount }, 
    { name: 'Player 2', pieces: defaultStartingPieceCount } 
  ],
  started: false,
  finished: false,
  history: [],
  moves: 0,
  pieces: gamePieces.createPieces(defaultGridSize, defaultStartingPieceCount)

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
        pieces: gamePieces.createPieces(action.req.data.gridSize, action.req.data.initialPieces)
      });

    case START_GAME:

      gameMessages.startGame();
      gameMessages.yourMove(state.players, state.activePlayer);

      return Object.assign({}, state, {
        started: true,
        activePlayer: 0,
        history: gameMessages.returnHistory(state.history),
        pieces: gamePieces.setActivePieces(0).pieces
      });

    case END_GAME:

      return Object.assign({}, state, {
        grid: createGrid(defaultGridSize),
        gridSize: defaultGridSize,
        startingPieceCount: defaultStartingPieceCount,
        activePlayer: 0,
        players: [
          { name: 'Player 1', pieces: defaultStartingPieceCount }, 
          { name: 'Player 2', pieces: defaultStartingPieceCount } 
        ],
        started: false,
        finished: false,
        history: [],
        moves: 0,
        pieces: gamePieces.createPieces(defaultGridSize, defaultStartingPieceCount)
      });

    case CREATE_PIECE_COLLECTION:
      return Object.assign({}, state, {
        pieces: gamePieces.createPieces(state.gridSize, state.startingPieceCount)
      });

    case SET_PIECE_SELECTION:
      return Object.assign({}, state, {
        pieces: gamePieces.selectPiece(action.cellRef)
      });

    case CLEAR_PIECE_SELECTIONS:
      return Object.assign({}, state, {
        pieces: gamePieces.unselectAllPieces()
      });

    case MOVE_ACTIVE_PIECE:

      const move = gamePieces.moveActivePiece(action.cellRef); // move the piece

      let playerData = state.players;
      let pieceMoveMessage;
      let opponent = state.activePlayer === 0 ? 1 : 0;
      let nextPlayer = opponent;
      let finished = state.finished;

      if(move.captures){ // if the move captured a piece

        gameMessages.movedTo(playerData, state.activePlayer, action.cellRef, true);
        playerData[opponent].pieces = playerData[opponent].pieces - 1;

        if(move.coronated){ // if piece landed on opposing end of the board, it becomes a king
          gameMessages.coronated(playerData, state.activePlayer);
          move.over = true; // the turn always finishes when a piece becomes a king, even if further captures are possible
        }

        if(playerData[0].pieces === 0 || playerData[1].pieces === 0){ // the game is over if either player has run out of pieces

          const winner = playerData[0].pieces > playerData[1].pieces ? 0 : 1; // the winner has at least on piece left
          
          gameMessages.victory(playerData, winner, state.moves);
          gamePieces.unselectAllPieces(); // remove slections
          gamePieces.setActivePieces(-1); // and make all remaining pieces inactive
          finished = true; // this flag renders the 'play again?' button

        }
      
      } else { // if the move didn't capture a piece
        gameMessages.movedTo(playerData, state.activePlayer, action.cellRef, false);
      }

      if(!finished){

        if(move.over){ // if there are no subsequent mandatory captures for the piece to make

          if(gamePieces.setActivePieces(opponent).activeCount === 0){ // if the next player has no available moves, they lose

            gameMessages.victory(playerData, state.activePlayer, state.moves);
            gamePieces.unselectAllPieces(); // remove selections
            gamePieces.setActivePieces(-1); // and make all remaining pieces inactive
            finished = true; // this flag renders the 'play again?' button
            
          } else {

            gameMessages.yourMove(playerData, opponent); // opposing player it's now your turn

            if(gamePieces.setActivePieces(opponent).captures){
              gameMessages.mustCapture(playerData, opponent); // there's at least one capture move you must make
            }

          }

        } else { // if the current player's move isn't over because there's a further possible capture move
          nextPlayer = state.activePlayer; // next player is the same player
          gameMessages.mustMove(playerData, state.activePlayer); // you must capture another piece      
        }

      }

      return Object.assign({}, state, {
        pieces: gamePieces.returnPieces(),
        players: playerData,
        history: gameMessages.returnHistory(state.history),
        activePlayer: nextPlayer,
        moves: state.moves + 1,
        finished: finished
      });

    default:
      return state;

  }
}
