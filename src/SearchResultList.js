import React from "react";
import { connect } from "react-redux";

function SearchResultList({ searchResults }) {
  return (
    <div className="search-result-list">
      <h2>Search Results</h2>
      {searchResults.map((result) => (
        <div className="search-result" key={result.place_id}>
          <div className="search-result-name">{result.name}</div>
          <div className="search-result-address">{result.address}</div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.searchResults,
});

export default connect(mapStateToProps)(SearchResultList);
