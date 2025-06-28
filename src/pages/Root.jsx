import { Outlet } from "react-router-dom";

function Root() {
  return (
    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}

export default Root;
