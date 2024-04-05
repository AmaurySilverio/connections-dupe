import { useState } from "react";
import categories from "../categories.json";

const ShuffleButton = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Shuffle
    </button>
  );
};

export default ShuffleButton;
