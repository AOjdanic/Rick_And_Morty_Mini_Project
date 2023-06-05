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
    <>
      <form className={classes.form} onSubmit={applyFilters}>
        <div className={classes["input-wrap"]}>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" id="name" />
        </div>

        <div className={classes["input-wrap"]}>
          <label htmlFor="species">Species</label>
          <input name="species" type="text" id="species" />
        </div>

        <div className={classes["input-wrap"]}>
          <label htmlFor="type">Type</label>
          <input name="type" type="text" id="type" />
        </div>
        <div className={classes["select-wrap"]}>
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value=""></option>
            <option value="alive">alive</option>
            <option value="dead">dead</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <div className={classes["select-wrap"]}>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option value=""></option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="genderless">genderless</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <button type="submit">Apply filters</button>
      </form>
    </>
  );
}

export default Filters;
