import { useState } from "react";
import categories from "../categories.json";

const ShuffleButton = () => {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  let categoriesArr = categories;
  shuffleArray(categoriesArr);
  console.log(categoriesArr);

  // const [shuffle, setShuffle] = useState("");

  function handleClick() {
    console.log("you clicked me");
  }

  return (
    <button className="button" onClick={handleClick}>
      Shuffle
    </button>
  );
};

export default ShuffleButton;
