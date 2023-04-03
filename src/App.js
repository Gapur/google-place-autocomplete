import React from "react";
// import SearchLocationInput from "./SearchLocationInput";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { switchMap, debounceTime } from "rxjs/operators";
import { of } from "rxjs";
import { Provider } from "react-redux"; // import Provider component
import MapContainer from "./MapContainer";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import SearchResultList from "./SearchResultList";

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
const searchPlacesEpic = (action$, state$) =>
  action$.ofType("SEARCH_PLACES").pipe(
    debounceTime(500),
    switchMap((action) =>
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${action.payload}&key=AIzaSyCtABEXRCga9WoTi_pQ3d8lvvRJXlQ-T9o`
      )
        .then((response) => response.json())
        .then((data) =>
          data.predictions.map((prediction) => ({
            description: prediction.description,
            place_id: prediction.place_id,
          }))
        )
        .then((searchResults) =>
          of({
            type: "SEARCH_PLACES",
            payload: searchResults,
          })
        )
        .catch((error) => console.log(error))
    )
  );
// Create the Redux store and apply the middleware
const epicMiddleware = createEpicMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
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
