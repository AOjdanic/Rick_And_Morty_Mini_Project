/* eslint-disable react/prop-types */
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "./Pagination.module.scss";

function Pagination({ page }) {
  let navigate = useNavigate();
  const [, { pages }] = useRouteLoaderData("pages");
  page *= 1;

  const goTo = (e) => navigate(`/pages/${e.target.textContent}`);

  return (
    <div className={classes.btns}>
      <button
        onClick={() => navigate(`/pages/${page - 1}`)}
        disabled={page === 1}
      >
        PREV
      </button>

      {page === pages && <button onClick={goTo}>{page - 2}</button>}

      {page > 1 && <button onClick={goTo}>{page - 1}</button>}
      <button onClick={goTo} style={{ boxShadow: "inset 0 0 2rem #cbd5e1" }}>
        {page}
      </button>
      {page < pages && <button onClick={goTo}>{page + 1}</button>}

      {page === 1 && <button onClick={goTo}>{page + 2}</button>}

      <button
        onClick={() => navigate(`/pages/${page + 1}`)}
        disabled={page === pages}
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
