const Hero = () => {
  // LOGIC FOR DATE WITH COMMA
  let date = new Date();

  date.setHours(0, 0, 0, 0);
  let dateWithoutTimeAndMonth = date.toDateString().slice(7);
  let month = date.toLocaleString("default", {
    month: "long",
  });
  let fullDateWithComma =
    month +
    dateWithoutTimeAndMonth.slice(0, -5) +
    "," +
    dateWithoutTimeAndMonth.slice(-5);
  // console.log(fullDateWithComma);
  // console.log("split", dateWithoutTimeAndMonth.slice(-4).split(""));
  // console.log(month);

  // Creating a date object
  // let today = new Date();

  // Getting full month name (e.g. "June")
  // let month = today.toLocaleString("default", { month: "long" });
  // console.log(month);

  return (
    <>
      <div className="hero-container">
        <div className="hero-margin-container">
          <h2>
            <em className="game-title">Connections </em>
            <span className="game-date">
              {/* {month} {dateWithoutTimeAndMonth} */}
              {fullDateWithComma}
            </span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Hero;
