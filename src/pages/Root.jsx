import MainHeading from "../components/MainHeading";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <MainHeading />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Root;
