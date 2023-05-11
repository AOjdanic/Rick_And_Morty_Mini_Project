import { useEffect, useState, useCallback, useContext } from "react";
import classes from "./Search.module.scss";
import SearchResult from "./SearchResult";
import { Link, useNavigate } from "react-router-dom";
import SearchResultsContext from "../context/search-context";

function Search() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const { setSearchResults } = useContext(SearchResultsContext);
  let navigate = useNavigate();

  const getCharactersByName = useCallback(async () => {
    if (query === "") return;

    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${query}`
    );

    if (res.status === 404) return "404";
    const { results } = await res.json();
    return results;
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await getCharactersByName();
      setCharacters(res);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, getCharactersByName]);

  const displayAllCharacters = (e) => {
    if (e.key === "Enter") {
      if (query === "") return;
      if (characters === "404") return;
      setSearchResults(characters);
      navigate(`/character/search-results/${query}`);
      setQuery("");
    }
  };

  return (
    <div className={classes["search-wrapper"]}>
      <input
        onKeyDown={displayAllCharacters}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classes.search}
        type="text"
        placeholder="Find a character..."
      />
      {characters && (
        <div className={classes["results-wrapper"]}>
          {characters &&
            characters !== "404" &&
            characters.slice(0, 10).map((char) => (
              <Link key={char.id} to={`/character/${char.id}`}>
                <SearchResult props={char} />
              </Link>
            ))}
          {characters === "404" && (
            <p className={classes["no-result"]}>
              No results found. Please try again
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
