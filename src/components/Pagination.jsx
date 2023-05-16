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
  const goTo = (e) => navigate(`/pages/${e.target.textContent}`);
  if (page < pages - 4) {
    pageBtns = [page - 1, page, page + 1, pages - 1, pages].map((i) => {
      if (i === 0) return;
      if (i === page) {
        return (
          <button
            style={{ boxShadow: "inset 0 0 2rem #cbd5e1" }}
            key={i}
            onClick={goTo}
          >
            {i}
          </button>
        );
      } else {
        return (
          <button key={i} onClick={goTo}>
            {i}
          </button>
        );
      }
    });
  } else {
    pageBtns = [4, 3, 2, 1, 0].map((i) => {
      if (page === pages - i) {
        return (
          <button
            style={{ boxShadow: "inset 0 0 2rem #cbd5e1" }}
            key={i}
            onClick={goTo}
          >
            {pages - i}
          </button>
        );
      } else {
        return (
          <button key={i} onClick={goTo}>
            {pages - i}
          </button>
        );
      }
    });
  }

  return (
    <div className={classes.btns}>
      <button
        onClick={() => navigate(`/pages/${page - 1}`)}
        disabled={page === 1}
      >
        PREV
      </button>
      {pageBtns}
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
