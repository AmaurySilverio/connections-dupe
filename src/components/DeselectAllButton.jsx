const DeselectAllButton = ({ onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="button deselect"
      id="deselect"
      onClick={onClick}
    >
      Deselect all
    </button>
  );
};

export default DeselectAllButton;
