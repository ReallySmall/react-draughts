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

const initialState = {
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
};

export default function game(state = initialState, action) {

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

      let playerData = state.players; // local copy of player data to modify
      let opponent = state.activePlayer === 0 ? 1 : 0; // the opponent of the active player
      let nextPlayer = opponent; // the next player, unless modified later if a subsequent move is required
      let finished = state.finished; // is the game finished yet? (it shouldn't be possible to be true at this point)

      if(move.captures){ // if the move captured a piece

        gameMessages.movedTo(playerData, state.activePlayer, action.cellRef, true); // add message to history
        playerData[opponent].pieces = playerData[opponent].pieces - 1; // deduct a piece from opponent

        if(move.coronated){ // if piece landed on opposing end of the board, it becomes a king
          gameMessages.coronated(playerData, state.activePlayer); // add message to history
          move.over = true; // the turn always finishes when a piece becomes a king, even if further captures are possible
        }

        if(playerData[0].pieces === 0 || playerData[1].pieces === 0){ // the game is over if either player has run out of pieces

          const winner = playerData[0].pieces > playerData[1].pieces ? 0 : 1; // the winner has at least one piece left
          
          gameMessages.victory(playerData, winner, state.moves); // add message to history
          gamePieces.unselectAllPieces(); // remove selections
          gamePieces.setActivePieces(-1); // and make all remaining pieces inactive
          finished = true; // this flag renders the 'play again?' button

        }
      
      } else { // if the move didn't capture a piece

        if(move.coronated){ // if piece landed on opposing end of the board, it becomes a king
          gameMessages.coronated(playerData, state.activePlayer); // add message to history
        }

        gameMessages.movedTo(playerData, state.activePlayer, action.cellRef, false); // add message to history

      }

      if(!finished){ // if the game hasn't finished

        if(!move.over){ // if the current player's move isn't over because there's a further possible capture move

          nextPlayer = state.activePlayer; // next player is the same player
          gameMessages.mustMove(playerData, state.activePlayer); // you must capture another piece 

        } else { // if there are no subsequent mandatory captures for the piece to make
               
          if(gamePieces.setActivePieces(opponent).activeCount === 0){ // if the next player has no available moves, they automatically lose

            gameMessages.victory(playerData, state.activePlayer, state.moves); // add message to history
            gamePieces.unselectAllPieces(); // remove selections
            gamePieces.setActivePieces(-1); // and make all remaining pieces inactive
            finished = true; // the game is finished - this flag renders the 'play again?' button

          } else {

            gameMessages.yourMove(playerData, opponent); // opposing player it's now your turn

            if(gamePieces.setActivePieces(opponent).captures){ // there's at least one capture move the player must make
              gameMessages.mustCapture(playerData, opponent); // add message to history
            }

          }

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

export { initialState as initialState };
