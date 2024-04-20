const SubmitButton = ({ onClick, disabled, show }) => {
  return show ? (
    <button
      id={disabled ? "" : "submit"}
      className="button submit"
      disabled={disabled}
      onClick={onClick}
    >
      Submit
    </button>
  ) : null;
};

export default SubmitButton;
