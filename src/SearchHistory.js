import React from "react";
import { connect } from "react-redux";

function SearchHistory({ allSearches }) {
  return (
    <div className="search-history">
      <h2>Search History</h2>
      {allSearches.map((search, index) => (
        <div className="search-item" key={index}>
          <div className="search-query">{search.query}</div>
          <div className="search-place">{search.place.name}</div>
          <div className="search-address">{search.place.address}</div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  allSearches: state.allSearches,
});

export default connect(mapStateToProps)(SearchHistory);
