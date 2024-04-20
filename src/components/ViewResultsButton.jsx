const ViewResultsButton = ({ show, onClick }) => {
  return show ? (
    <button className="button view-results" onClick={onClick}>
      View Results
    </button>
  ) : (
    console.log("viewResultConsoleLog")
  );
};
export default ViewResultsButton;
