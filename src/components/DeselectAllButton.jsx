const DeselectAllButton = () => {
  function handleClick() {
    console.log("you clicked me");
  }
  return (
    <button className="button deselect" onClick={handleClick}>
      Deselect all
    </button>
  );
};

export default DeselectAllButton;
