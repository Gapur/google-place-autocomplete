import axios from "axios";
export const SEARCH_PLACES = "SEARCH_PLACES";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const ADD_SEARCH = "ADD_SEARCH";

export const searchPlaces = (searchText) => {
  return async (dispatch) => {
    dispatch({ type: "SEARCH_PLACES_REQUEST" });
    try {
      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=AIzaSyCtABEXRCga9WoTi_pQ3d8lvvRJXlQ-T9o&libraries=places`,
        {
          mode: "cors",
        }
      );
      dispatch({
        type: "SEARCH_PLACES_SUCCESS",
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: "SEARCH_PLACES_FAILURE",
        payload: error.message,
      });
    }
  };
};

export function receiveSearchResults(searchResults) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    searchResults,
  };
}

export function addSearch(search) {
  return {
    type: ADD_SEARCH,
    search,
  };
}
