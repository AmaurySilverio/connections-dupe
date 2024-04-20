const ShuffleButton = ({ onClick, show }) => {
  return show ? (
    <button className="button" onClick={onClick}>
      Shuffle
    </button>
  ) : null;
};

export default ShuffleButton;
