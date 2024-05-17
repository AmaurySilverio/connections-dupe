import { useEffect } from "react";

const SameGuess = () => {
  setTimeout(() => {}, 2000);
  useEffect(() => {}, []);
  return (
    <>
      <div className="same-guess-container">
        <h2>Already Guessed!</h2>
      </div>
    </>
  );
};

export default SameGuess;
