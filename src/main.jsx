import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { SearchResultsContextProvider } from "./context/search-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchResultsContextProvider>
      <App />
    </SearchResultsContextProvider>
  </React.StrictMode>
);
