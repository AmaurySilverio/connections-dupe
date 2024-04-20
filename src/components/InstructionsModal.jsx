const InstructionsModal = () => {
  return (
    <div className="instructions-modal-wrapper">
      <div className="instructions-modal-content">
        <div className="winner-button-container" onClick={onClick}>
          <button>
            Back to game
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 close"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
