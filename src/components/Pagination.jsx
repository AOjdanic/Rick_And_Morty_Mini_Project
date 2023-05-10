/* eslint-disable react/prop-types */
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "./Pagination.module.scss";

function Pagination({ page }) {
  let navigate = useNavigate();
  const [, info] = useRouteLoaderData("pages");
  let { pages } = info;
  let pageBtns;
  page *= 1;
  if (isNaN(page)) page = 1;
  pages *= 1;
  const goTo = (e) => navigate(`/${e.target.textContent}`);
  if (page < pages - 4) {
    pageBtns = (
      <>
        <button>{page}</button>
        <button onClick={goTo}>{page + 1}</button>
        <button>...</button>
        <button onClick={goTo}>{pages - 1}</button>
        <button onClick={goTo}>{pages}</button>
      </>
    );
  } else {
    pageBtns = (
      <>
        <button onClick={goTo}>{pages - 4}</button>
        <button onClick={goTo}>{pages - 3}</button>
        <button onClick={goTo}>{pages - 2}</button>
        <button onClick={goTo}>{pages - 1}</button>
        <button onClick={goTo}>{pages}</button>
      </>
    );
  }

  return (
    <div className={classes.btns}>
      <button onClick={() => navigate(`/${page - 1}`)} disabled={page === 1}>
        PREV
      </button>
      {pageBtns}
      <button
        onClick={() => navigate(`/${page + 1}`)}
        disabled={page === pages}
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
