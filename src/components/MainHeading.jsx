import { useNavigate } from "react-router-dom";
import classes from "./MainHeading.module.scss";

function MainHeading() {
  let navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className="container">
        <h1 onClick={() => navigate("/1")} className={classes.title}>
          Rick & Morty Characters
        </h1>
      </div>
    </header>
  );
}

export default MainHeading;
