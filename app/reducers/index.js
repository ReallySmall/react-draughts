import { combineReducers } from 'redux';
import game from 'reducers/game';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  game,
  routing: routerReducer
});

export default rootReducer;
