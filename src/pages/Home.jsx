import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

function Home() {
  return (
    <>
      <Search />
      <Filters />
      <Pagination page={page} />
    </>
  );
}

export default Home;
