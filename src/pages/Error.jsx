import { useNavigate, useRouteError } from "react-router-dom";
import classes from "./Error.module.scss";
import MainHeading from "../components/MainHeading";
import { useEffect } from "react";

function Error() {
  const error = useRouteError();
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/1"), 2000);
  });

  let title = "⚠️Something went wrong!\n Please try again later 😊";

  return (
    <>
      <MainHeading />
      <h2 className={classes["error-title"]}>
        {error.message ? error.message : title}
      </h2>
    </>
  );
}

export default Error;
