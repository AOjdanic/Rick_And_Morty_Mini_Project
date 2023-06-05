/* eslint-disable react-refresh/only-export-components */
import Search from "../components/Search";
import Card from "../components/Card";
import { useLoaderData, Link } from "react-router-dom";
import PaginationSimple from "../components/PaginationSimple";

function FilteredCharacters() {
  const [results, info] = useLoaderData();

  return (
    <>
      <Search />
      <div className="grid--3-cols">
        {results.map((result) => (
          <Link to={`/character/${result.id}`} key={result.id}>
            <Card props={result} />
          </Link>
        ))}
      </div>
      <PaginationSimple info={info} />
    </>
  );
}

export default FilteredCharacters;

export async function loader({ request }) {
  try {
    const { url } = request;
    const urlObject = new URL(url);
    const filters = urlObject.searchParams.toString();
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?${filters}`
    );

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    const { results, info } = await res.json();
    return [results, info];
  } catch (err) {
    throw new Error(err.message);
  }
}
