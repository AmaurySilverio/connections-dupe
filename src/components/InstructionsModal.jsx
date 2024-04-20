const InstructionsModal = ({ onClick, show }) => {
  const showHideClassName = show
    ? "instructions-modal-wrapper"
    : "display-none";

  const bgColors = {
    yellow: "(249, 223, 109)",
    green: "160, 195, 90",
    blue: "176, 196, 239",
    purple: "186, 129, 197",
  };
  return (
    <div className={showHideClassName}>
      <div className="instructions-modal-container">
        <div className="instructions-modal-button-container" onClick={onClick}>
          <button>
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
        <div className="instructions-modal-content">
          <h2 className="modal-header">How to Play</h2>
          <p className="modal-description">
            Find groups of four items that share something in common.
          </p>
          <ul className="bullet-list">
            <li className="modal-system-body">
              Select four items and tap{" "}
              <span className="module-bold">'Submit'</span> to check if your
              guess is correct.
            </li>
            <li className="modal-system-body">
              Find the groups without making 4 mistakes!
            </li>
          </ul>
          <h4 className="module-bold">Category Examples</h4>
          <dl className="modal-system-body how-to-play-list-module">
            <span className="how-to-play-list-item">
              <dt className="how-to-play-list-item-module-display">FISH:</dt>
              <dd className="how-to-play-list-item-module-display">
                Bass, Flounder, Salmon, Trout
              </dd>
            </span>
            <span className="how-to-play-list-item">
              <dt className="how-to-play-list-item-module-display">
                FIRE ___:
              </dt>
              <dd className="how-to-play-list-item-module-display">
                Ant, Drill, Island, Opal
              </dd>
            </span>
          </dl>
          <p className="modal-system-body how-to-play-module-message">
            Categories will always be more specific than "5-LETTER-WORDS,"
            "NAMES" or "VERBS."
          </p>
          <p className="modal-system-body how-to-play-module-message">
            Each puzzle has exactly one solution. Watch out for words that seem
            to belong to multiple categories!
          </p>
          <p className="modal-system-body how-to-play-module-message-final">
            Each group is assigned a color, which will be revealed as you solve:
          </p>
          <ul className="how-to-play-module-difficulty">
            <span className="arrow-module-container">
              <span className="arrow-module"></span>
            </span>
            <li className="how-to-play-category-li">
              <span className="how-to-play-category-color bg-yellow"></span>
              <span>Straightforward</span>
            </li>
            <li className="how-to-play-category-li">
              <span className="how-to-play-category-color bg-green"></span>
              <span></span>
            </li>
            <li className="how-to-play-category-li">
              <span className="how-to-play-category-color bg-blue"></span>
              <span></span>
            </li>
            <li className="how-to-play-category-li">
              <span className="how-to-play-category-color bg-purple"></span>
              <span>Tricky</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
