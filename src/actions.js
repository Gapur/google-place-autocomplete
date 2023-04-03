export const SEARCH_PLACES = "SEARCH_PLACES";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const ADD_SEARCH = "ADD_SEARCH";

export function searchPlaces(query) {
  return function (dispatch) {
    fetch(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCtABEXRCga9WoTi_pQ3d8lvvRJXlQ-T9o&libraries=places`,
      {
        mode: "no-cors",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.predictions.map((prediction) => ({
          place_id: prediction.place_id,
          description: prediction.description,
        }));
        dispatch(receiveSearchResults(searchResults));
      })
      .catch((error) => console.log(error));
  };
}

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
