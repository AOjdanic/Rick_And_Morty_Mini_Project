/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import classes from "./Card.module.scss";

function Card({
  props: {
    id,
    image,
    name,
    status,
    location: { name: lastLocation },
  },
}) {
  return (
    <div className={classes.card}>
      <div className={`${classes.card_side} ${classes.card_side_front}`}>
        <p
          className={status === "unknown" ? classes.status_pad : classes.status}
        >
          {status === "unknown" ? "Unknown" : status}
        </p>
        <div className={classes["card-img-box"]}>
          <img
            className={classes["card-img"]}
            src={image}
            alt="character profile"
          />
        </div>
        <div className={classes["card-text-box"]}>
          <h2 className={classes.name}>{name}</h2>
          <p className={classes.location}>Last location: {lastLocation}</p>
        </div>
      </div>
      <div className={`${classes.card_side} ${classes.card_side_back}`}>
        <Link to={`/${id}`}>
          <button className={classes.btn_back}>More info</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
