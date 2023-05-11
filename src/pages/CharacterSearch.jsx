import { useContext } from "react";
import SearchResultsContext from "../context/search-context";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function CharacterSearch() {
  const { searchResults } = useContext(SearchResultsContext);

  return (
    <>
      <Search />
      <div className="grid--3-cols">
        {searchResults.map((result) => (
          <Link to={`/character/${result.id}`} key={result.id}>
            <Card props={result} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default CharacterSearch;
