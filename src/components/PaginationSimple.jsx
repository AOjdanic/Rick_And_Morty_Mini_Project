import { useNavigate } from "react-router-dom";
import classes from "./Pagination.module.scss";
/* eslint-disable react/prop-types */
function PaginationSimple({ info: { prev, next } }) {
  let navigate = useNavigate();
  return (
    <div className={classes.btns}>
      <button onClick={() => navigate(`/pages/${prev.split("=").at(-1)}`)}>
        &larr;
      </button>
      <button onClick={() => navigate(`/pages/${next.split("=").at(-1)}`)}>
        &rarr;
      </button>
    </div>
  );
}

export default PaginationSimple;
