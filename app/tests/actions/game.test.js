import * as actions from '../../actions/game';
import * as types from '../../constants/';

describe('actions', () => {

  it('should create an action to change game type from xhr call to api', () => {

    const expectedAction = {
      type: types.START_GAME
    }

    expect(actions.startGame()).toEqual(expectedAction);

  });

  it('should create an action to start a new game', () => {

    const expectedAction = {
      type: types.START_GAME
    }

    expect(actions.startGame()).toEqual(expectedAction);

  });

  it('should create an action to end the current game', () => {

    const expectedAction = {
      type: types.END_GAME
    }

    expect(actions.endGame()).toEqual(expectedAction);

  });

});

export function setGameType(typeId) {
  return {
    type: types.CHANGE_GAME_TYPE,
    promise: makeGameTypeRequest('get', typeId)
  }
}
