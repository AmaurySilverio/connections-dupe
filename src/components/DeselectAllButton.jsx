const DeselectAllButton = ({ onClick, disabled, show }) => {
  return show ? (
    <button
      disabled={disabled}
      className="button deselect"
      id="deselect"
      onClick={onClick}
    >
      Deselect all
    </button>
  ) : null;
};

export default DeselectAllButton;
