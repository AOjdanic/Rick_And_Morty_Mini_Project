/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useParams } from "react-router-dom";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

//responsive design,fix image responsiveness

function Home() {
  const { page } = useParams();
  const [results] = useLoaderData();
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
      <Pagination page={page} />
    </>
  );
}

export default Home;

export async function loader({ params }) {
  let { page } = params;

  if (page < 1 || page > 42)
    throw new Error("⚠️The page you requested doesn't exist!");

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page ? page : "1"}`
  );

  if (!res.ok)
    throw new Error("⚠️Error getting characters data! Please try again 😊");

  const { results, info } = await res.json();
  return [results, info];
}
