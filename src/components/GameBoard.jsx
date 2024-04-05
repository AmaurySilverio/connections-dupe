import { useState } from "react";
import MistakesRemaining from "./MistakesRemaining";
import ShuffleButton from "./ShuffleButton";
import DeselectAllButton from "./DeselectAllButton";
import SubmitButton from "./SubmitButton";
import Card from "./Card";
import categories from "../categories.json";

let categoriesArr = categories;

const GameBoard = () => {
  const [shuffle, setShuffle] = useState(false);
  const [cardCount, setCardCount] = useState(0);
  const [compareCards, setCompareCards] = useState([]);
  // SHUFFLE FUNCTION
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  // SHUFFLE CLICK FUNCTION
  const handleShuffle = () => {
    shuffleArray(categoriesArr);
    console.log("shuffle triggered");
    setShuffle(!shuffle);
  };
  // CARD CLICK FUNCTION
  const handleCardClick = (event) => {
    console.log("card clicked", event);
    let cardAttributes = event.target.attributes;
    if (cardAttributes["hasOwnProperty"]("data-status")) {
      event.target.removeAttribute("data-status");
      const updatedCardCount = cardCount - 1;
      setCardCount(updatedCardCount);

      let cardId = cardAttributes["id"].value;
      setCompareCards(compareCards.filter((card) => card.id !== cardId));
    } else {
      if (cardCount === 4) {
        console.log("count = 4");
        return;
      }
      event.target.setAttribute("data-status", "clicked");
      const updatedCardCount = cardCount + 1;
      setCardCount(updatedCardCount);
      let cardName = event.target.innerHTML;
      let cardId = cardAttributes["id"].value;
      let cardCategory = cardAttributes["data-category"].value;
      const clickedCard = {
        name: cardName,
        id: cardId,
        category: cardCategory,
      };
      setCompareCards(compareCards.concat(clickedCard));
      // setCompareCards(compareCards.concat(cardCategory));
      // console.log(compareCards);
      // console.log(cardId);
    }
  };
  // SUBMIT CLICK FUNCTION
  const handleSubmit = () => {
    console.log("submit clicked");
    if (cardCount !== 4) {
      console.log("You need to have four cards highlighted to submit");
      return;
    } else {
      console.log(compareCards.map((card) => {}));
      // const allEqual = (arr) => arr.every((val) => val === arr[0]);
      // console.log(allEqual(compareCards));
    }
  };

  return (
    <>
      <h3 className="create-title">Create four groups of four!</h3>
      <div className="gameboard-container">
        <div className="grid grid-cols-4 gap-2">
          {categoriesArr.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              category={card.category}
              onClick={handleCardClick}
            />
          ))}
        </div>
        <MistakesRemaining />
        <div className="buttons">
          <ShuffleButton onClick={handleShuffle} />
          <DeselectAllButton />
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
