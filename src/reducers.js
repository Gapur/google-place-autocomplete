import { combineReducers } from "redux";
import { SEARCH_PLACES, RECEIVE_SEARCH_RESULTS, ADD_SEARCH } from "./actions";

function searchResults(state = [], action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.searchResults;
    default:
      return state;
  }
}

function allSearches(state = [], action) {
  switch (action.type) {
    case ADD_SEARCH:
      return [action.search, ...state];
    default:
      return state;
  }
}

function currentLocation(state = null, action) {
  switch (action.type) {
    case SEARCH_PLACES:
      return action.currentLocation;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  searchResults,
  allSearches,
  currentLocation,
});

export default rootReducer;
