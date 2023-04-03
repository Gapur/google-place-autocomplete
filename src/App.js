import React from "react";
// import SearchLocationInput from "./SearchLocationInput";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { Provider } from "react-redux"; // import Provider component
import MapContainer from "./MapContainer";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import SearchResultList from "./SearchResultList";
import { searchPlaces } from "./actions";
import { ofType } from "redux-observable";
import { switchMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";

import "./App.css";
const initialState = {
  searchResults: [],
  allSearches: [],
};

// Define the reducer that handles the SEARCH_PLACES and ADD_SEARCH actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_PLACES":
      return { ...state, searchResults: action.payload };
    case "ADD_SEARCH":
      return { ...state, allSearches: [action.payload, ...state.allSearches] };
    default:
      return state;
  }
};

// Define the epic that handles the SEARCH_PLACES action
export const searchPlacesEpic = (action$, state$) =>
  action$.pipe(
    ofType("SEARCH_PLACES"),
    switchMap(({ payload }) =>
      from(
        fetch(
          `https://maps.googleapis.com/maps/api/js?key=AIzaSyCtABEXRCga9WoTi_pQ3d8lvvRJXlQ-T9o&libraries=places`,
          {
            mode: "no-cors",
          }
        )
      ).pipe(
        switchMap((response) => response.json()),
        map((response) => searchPlaces(response)),
        catchError((error) => of(searchPlaces(error)))
      )
    )
  );
// Create the Redux store and apply the middleware
const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  // applyMiddleware(thunkMiddleware),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
// Run the epic middleware
epicMiddleware.run(searchPlacesEpic);
function App() {
  return (
    // <div className="app">
    //   <h2>Google Auto Search</h2>
    //   <SearchLocationInput onChange={() => null} />
    // </div>
    <Provider store={store}>
      <div className="App">
        <div className="header">
          <h1>Google Places Autocomplete Map</h1>
        </div>
        <div className="container">
          <div className="search">
            <SearchBar />
          </div>
          <div className="map">
            <MapContainer />
          </div>
          <div className="search-results">
            <SearchResultList />
          </div>
          <div className="search-history">
            <SearchHistory />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
