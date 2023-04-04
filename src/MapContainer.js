import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { loadMapScript, initMap } from "./utils/map";

function MapContainer({ searchResults, currentLocation }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps API and initialize the map
    loadMapScript(
      process.env.REACT_APP_GOOGLE_API_KEY,
      mapRef.current,
      currentLocation
    );
  }, [currentLocation]);

  useEffect(() => {
    // Add markers for each search result
    searchResults.forEach((result) => {
      initMap(mapRef.current, result.location, result.name);
    });
  }, [searchResults]);

  return (
    <div className="map-container">
      <div className="map" ref={mapRef}></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.searchResults,
  currentLocation: state.currentLocation,
});

export default connect(mapStateToProps)(MapContainer);
