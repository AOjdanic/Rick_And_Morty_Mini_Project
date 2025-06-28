import { useNavigate } from "react-router-dom";
import classes from "./Filters.module.scss";

function Filters() {
  let navigate = useNavigate();

  const applyFilters = (e) => {
    e.preventDefault();
    const elements = Array.from(e.target.elements);
    const filterStr =
      "?" +
      elements
        .map((el) => [el.id, el.value.toLowerCase()])
        .filter((pair) => pair.at(-1) !== "")
        .map((pair) => `${pair.join("=")}`)
        .join("&");

    if (filterStr === "?") return;

    navigate(`/characters${filterStr}`);
  };
  return (
  );
}

export default Filters;
