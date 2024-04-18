const SubmitButton = ({ onClick, disabled }) => {
  return (
    <button className="button submit" disabled={disabled} onClick={onClick}>
      Submit
    </button>
  );
};

export default SubmitButton;
