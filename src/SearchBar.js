import React, { useState } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { searchPlaces } from "./actions";
import SearchResultList from "./SearchResultList";

function SearchBar({ searchPlaces }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value === "") {
      return;
    }
    setLoading(true);
    await searchPlaces(value);
    setLoading(false);
  };

  return (
    <div className="search-bar">
      <Input.Search
        placeholder="Enter a location"
        size="large"
        onSearch={handleSearch}
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        loading={loading}
      />
      <SearchResultList />
    </div>
  );
}

const mapDispatchToProps = {
  searchPlaces,
};

export default connect(null, mapDispatchToProps)(SearchBar);
