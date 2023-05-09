import classes from "./MainHeading.module.scss";

function MainHeading() {
  return (
    <header className={classes.header}>
      <div className="container">
        <h1 className={classes.title}>Rick & Morty Characters </h1>
      </div>
    </header>
  );
}

export default MainHeading;
