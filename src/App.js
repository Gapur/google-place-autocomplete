import React from "react";

import SearchLocationInput from "./SearchLocationInput";

import "./App.css";

function App() {
  return (
    <div className="app">
      <h2>Google Auto Search</h2>
      <SearchLocationInput onChange={() => null} />
    </div>
  );
}

export default App;
