/* eslint-disable react/prop-types */
import classes from "./SearchResult.module.scss";

function SearchResult({ props }) {
  return (
    <article className={classes.result}>
      <img className={classes.img} src={props.image} alt="" />
      <p className={classes.name}>{props.name}</p>
    </article>
  );
}

export default SearchResult;
