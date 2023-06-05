/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useParams } from "react-router-dom";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

function Home() {
  const { page } = useParams();
  const [results] = useLoaderData();

  return (
    <>
      <Search />
      <Filters />
      <div className="grid--3-cols">
        {results.map((result) => (
          <Link to={`/character/${result.id}`} key={result.id}>
            <Card props={result} />
          </Link>
        ))}
      </div>
      <Pagination page={page} />
    </>
  );
}

export default Home;

export async function loader({ params }) {
  try {
    let { page } = params;

    if (page < 1 || isNaN(page))
      throw new Error("⚠️The page you requested doesn't exist!");

    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page ? page : "1"}`
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
