import { each } from 'underscore';
import game from '../../reducers/game';
import * as initialState from '../../reducers/game';
import * as types from '../../constants/';

describe('Game reducer', () => {

  it('Should correctly set the initial state', () => {
    
    const initialStateSubset = {
      activePlayer: 0,
      started: false,
      finished: false,
      history: [],
      moves: 0
    };

    expect(
      game(undefined, {})
    ).toMatchObject(initialStateSubset);

  });

  it('Should correctly update the game type', () => {

    const gameTypeSubset = {
      gridSize: 8,
      startingPieceCount: 12,
      rules: ''
    };
    
    expect(
      game(undefined, {
        type: types.CHANGE_GAME_TYPE_SUCCESS,
        req: {
          data: {
            gridSize: 8,
            initialPieces: 12,
            rules: ''
          }
        }
      })
    ).toMatchObject(gameTypeSubset);

  });

  it('Should set the correct defaults for starting the game', () => {

    const gameStartSubset = {
      started: true,
      activePlayer: 0
    };
    
    expect(
      game(undefined, {
        type: types.START_GAME
      })
    ).toMatchObject(gameStartSubset);

  });

  it('Should set the correct defaults for ending the game', () => {

    const gameEndSubset = {
      started: false,
      finished: false,
      activePlayer: 0,
      history: []
    };
    
    expect(
      game(undefined, {
        type: types.END_GAME
      })
    ).toMatchObject(gameEndSubset);

  });

  it('Should create a valid piece collection object', () => {

    const pieces = game(undefined, {
      type: types.CREATE_PIECE_COLLECTION
    }).pieces;

    for (var piece in pieces) {

      const pieceObj = pieces[piece];
      const { cellRef, gridSize, player, colour } = pieceObj

      expect(pieceObj).toHaveProperty('cellRef');
      expect(typeof cellRef).toBe('string');
      expect(cellRef).toHaveLength(3);
      expect(typeof parseInt(cellRef[0]), 10).toBe('number');
      expect(cellRef[1]).toBe('_');
      expect(typeof parseInt(cellRef[2]), 10).toBe('number');

      expect(pieceObj).toHaveProperty('gridSize');
      expect(typeof gridSize).toBe('number');

      expect(pieceObj).toHaveProperty('player');
      expect(typeof player).toBe('number');
      expect(player).toBeGreaterThan(-1);
      expect(player).toBeLessThan(2);

      expect(pieceObj).toHaveProperty('colour');
      expect(['player1', 'player2']).toContain(colour);

      expect(pieceObj).toHaveProperty('type', 'pawn');
      expect(pieceObj).toHaveProperty('active', false);
      expect(pieceObj).toHaveProperty('selected', false);
      expect(pieceObj).toHaveProperty('captures', []);

    };

  });

  it('Should set the correct piece\'s selected property to true', () => {
    
    const cellRef = '0_0';

    expect(
      game(undefined, {
        type: types.SET_PIECE_SELECTION,
        cellRef: cellRef
      }).pieces[cellRef].selected
    ).toEqual(true);

  });

  it('Should set the selected property on all pieces to false', () => {
    
    const pieces = game(undefined, {
      type: types.CLEAR_PIECE_SELECTIONS
    }).pieces;

    for (var piece in pieces) {
      expect(pieces[piece]).toHaveProperty('selected', false);
    };

  });

  it('Should correctly update the game state on moving a piece', () => { // currently hard to fully test what happens here - the reducer function needs refactoring 
    
    const newState = game(undefined, {
      type: types.MOVE_ACTIVE_PIECE,
      cellRef: '0_0'
    });

    const { activePlayer, players, history, moves } = newState;

    expect(players).toHaveLength(2);
    expect(history).not.toHaveLength(0);
    expect(moves).toBeGreaterThan(0);
    expect(typeof activePlayer).toBe('number');
    expect(activePlayer).toBeGreaterThan(-1);
    expect(activePlayer).toBeLessThan(2);

  });

});