const WinnerModal = ({ show, onClick }) => {
  if (!show) {
    return null;
  }
  return (
    <div id="winner-modal-wrapper">
      <div className="winner-modal-container">
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
        <article className="winner-modal-article">
          <div className="winner-modal-content">
            <h2>Good Job!</h2>
            <h3>Connections #1</h3>
          </div>
        </article>
      </div>
    </div>
  );
};

export default WinnerModal;
