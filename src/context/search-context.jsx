/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const SearchResultsContext = createContext(null);

export const SearchResultsContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const results = {
    searchResults,
    setSearchResults,
  };

  return (
    <SearchResultsContext.Provider value={results}>
      {children}
    </SearchResultsContext.Provider>
  );
};

export default SearchResultsContext;
