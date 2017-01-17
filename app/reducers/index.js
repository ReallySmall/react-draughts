import { combineReducers } from 'redux';
import wrapper from 'reducers/wrapper';
import game from 'reducers/game';
import pieces from 'reducers/pieces';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  wrapper,
  game,
  pieces,
  routing: routerReducer
});

export default rootReducer;
