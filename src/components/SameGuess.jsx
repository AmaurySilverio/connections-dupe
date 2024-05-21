import { useEffect } from "react";

const SameGuess = ({ show }) => {
  // setTimeout(() => {}, 2000);
  // useEffect(() => {}, []);
  // if (!show) {
  //   return null;
  // }
  const showHideClassName = show ? "" : "visibility-hidden";

  return (
    <div id={showHideClassName}>
      <div className="same-guess-container">
        <h2>Already Guessed!</h2>
      </div>
    </div>
  );
};

export default SameGuess;
