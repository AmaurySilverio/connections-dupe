import { useState } from "react";
import InstructionsModal from "./InstructionsModal";

const Instructions = () => {
  const [instructions, setInstructions] = useState(false);
  const handleInstructionsClick = () => {
    console.log("clicked");
    setInstructions(true);
  };
  const handleModalClose = () => {
    console.log("modal close clicked");
    setInstructions(false);
  };
  return (
    <>
      <InstructionsModal show={instructions} onClick={handleModalClose} />
      <div className="instructions-container">
        <h3 className="create-title">Create four groups of four!</h3>
        <button
          className="instructions-button"
          onClick={handleInstructionsClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            id="instructions-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Instructions;
