import * as actions from '../../actions/pieces';
import * as types from '../../constants/';

describe('actions', () => {

  it('should create an action to create a piece collection', () => {

    const expectedAction = {
      type: types.CREATE_PIECE_COLLECTION
    }

    expect(actions.createPieceCollection()).toEqual(expectedAction);

  });

  it('should create an action to clear any piece selections', () => {

    const expectedAction = {
  		type: types.CLEAR_PIECE_SELECTIONS
    }

    expect(actions.clearPieceSelections()).toEqual(expectedAction);

  });

  it('should create an action to clear any piece selections and set selection on a piece', () => {

    const cellRefString = '0_0';

    const expectedAction = {
      type: types.SET_PIECE_SELECTION,
      cellRef: cellRefString
    }

    expect(actions.setPieceSelection(cellRefString)).toEqual(expectedAction);

  });

  it('should create an action to move an active piece', () => {

    const cellRefString = '0_0';

    const expectedAction = {
      type: types.MOVE_ACTIVE_PIECE,
      cellRef: cellRefString
    }

    expect(actions.moveActivePieceToHere(cellRefString)).toEqual(expectedAction);

  });

});
