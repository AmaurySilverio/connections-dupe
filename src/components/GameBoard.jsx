import MistakesRemaining from "./MistakesRemaining";
import ShuffleButton from "./ShuffleButton";
import DeselectAllButton from "./DeselectAllButton";
import SubmitButton from "./SubmitButton";
import Card from "./Card";
import categories from "../categories.json";

const GameBoard = () => {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  let categoriesArr = categories;
  shuffleArray(categoriesArr);
  console.log(categoriesArr);

  return (
    <>
      <h3 className="create-title">Create four groups of four!</h3>
      <div className="gameboard-container">
        <div className="grid grid-cols-4 gap-2">
          {categoriesArr.map((card) => (
            <Card key={card.id} name={card.name} />
          ))}
          {/* {arr.map((num) => {
            <Card key={} card={categories.indexOf(num)}/>
          })} */}
        </div>
        <MistakesRemaining />
        <div className="buttons">
          <ShuffleButton />
          <DeselectAllButton />
          <SubmitButton />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
