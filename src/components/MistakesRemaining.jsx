const MistakesRemaining = () => {
  return (
    <div className="mistakes-container">
      <h4 className="mistakes-htag">
        Mistakes Remaining:
        <span className="mistakes-remaining-bubbles-container">
          <div className="mistakes-remaining-bubble" id="1"></div>
          <div className="mistakes-remaining-bubble" id="2"></div>
          <div className="mistakes-remaining-bubble" id="3"></div>
          <div className="mistakes-remaining-bubble" id="4"></div>
        </span>
      </h4>
    </div>
  );
};

export default MistakesRemaining;
