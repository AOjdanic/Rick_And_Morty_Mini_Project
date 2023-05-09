import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Search from "../components/Search";

//responsive design, errors, errorpage, details page, pagination,fix image responsiveness, make pages for each page in info object? , pagination to be done through info object

function Home() {
  const results = useLoaderData();
  return (
    <>
      <Search />
      <div className="grid--3-cols">
        {results.map((result) => (
          <Link to={`/${result.id}`} key={result.id}>
            <Card props={result} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;

export async function loader() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results } = await res.json();
  return results;
}
