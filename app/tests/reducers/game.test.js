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

  // it('Should create a piece collection object', () => {
    
  //   expect(
  //     game(undefined, {
  //       type: types.CREATE_PIECE_COLLECTION
  //     })
  //   ).pieces.toMatchObject(gameStartSubset);

  // });

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

});