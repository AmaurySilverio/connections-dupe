const DeselectAllButton = ({ onClick }) => {
  return (
    <button className="button deselect" onClick={onClick}>
      Deselect all
    </button>
  );
};

export default DeselectAllButton;
