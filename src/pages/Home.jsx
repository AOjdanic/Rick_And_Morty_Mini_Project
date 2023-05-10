/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useParams } from "react-router-dom";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

//responsive design, errors, errorpage, details page,fix image responsiveness

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
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page ? page : "1"}`
  );
  const { results, info } = await res.json();
  return [results, info];
}
