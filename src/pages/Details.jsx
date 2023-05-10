/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import classes from "./Details.module.scss";

function Details() {
  const {
    name,
    status,
    gender,
    image,
    location: { name: charLocation },
    origin: { name: origin },
    species,
    type,
    episode,
  } = useLoaderData();
  return (
    <div className={classes["details"]}>
      <h2>{name}</h2>
      <div className={classes["grid-div"]}>
        <img src={image} alt="character profile" />
        <p>
          Status:&nbsp; <span>{status}</span>
        </p>
        <p>
          Gender:&nbsp; <span>{gender}</span>
        </p>
        <p>
          Location:&nbsp; <span>{charLocation}</span>
        </p>
        <p>
          Origin:&nbsp; <span>{origin}</span>
        </p>
        <p>
          Species:&nbsp; <span>{species}</span>
        </p>
        {type !== "" && (
          <p>
            Type: <span>{type}</span>
          </p>
        )}
        <p>
          Appears in: &nbsp;
          <span>
            {episode.length} {episode.length === 1 ? "episode" : "episodes"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Details;

export async function loader({ params }) {
  const { id } = params;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok)
    throw new Error("⚠️Error getting character details! Please try again 😊");

  const data = await res.json();
  return data;
}
