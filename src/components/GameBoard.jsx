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
  const [clickedCardsCopy, setClickedCardsCopy] = useState([]);
  const [compareCards, setCompareCards] = useState([]);
  // SHUFFLE FUNCTION
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  // SHUFFLE BUTTON FUNCTION
  const handleShuffle = () => {
    shuffleArray(categoriesArr);
    setShuffle(!shuffle);
  };
  // DESELECTALL BUTTON FUNCTION
  const handleDeselectAll = () => {
    // console.log(event.target.parentElement.parentElement.children[0].children);
    // const cards =
    //   event.target.parentElement.parentElement.childNodes[0].children;
    // console.log(cards[0].dataset);
    // console.log(cards);
    // console.log(cards[0].map((card) => card));

    // let clickedCardsAttributes = clickedCardsCopy.map((card) => card.dataset);
    // let clickedCardsDataSet = clickedCardsAttributes.map((card) => card.status);
    // console.log(clickedCardsDataSet);
    setClickedCardsCopy(
      clickedCardsCopy.map((card) => card.removeAttribute("data-status"))
    );
    setClickedCardsCopy([]);
    setCompareCards([]);
    setCardCount(0);
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
      // let cardClicked = event.target;
      // setClickedCardsCopy(clickedCardsCopy.concat(cardClicked));
      // console.log(clickedCardsCopy, "clickedCardCopy");
      // WORKING ON THIS clickedCardsCopy state to hold cards clicked and remove data-catagorty set on cards once deselect all is selected
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
      let cardClicked = event.target;
      setClickedCardsCopy(clickedCardsCopy.concat(cardClicked));
      console.log(clickedCardsCopy, "clickedCardCopy");
      // setCompareCards(compareCards.concat(cardCategory));
      // console.log(compareCards);
      // console.log(cardId);
    }
  };
  // SUBMIT BUTTON FUNCTION
  const handleSubmit = () => {
    console.log("submit clicked");
    if (cardCount !== 4) {
      console.log("You need to have four cards highlighted to submit");
      return;
    } else {
      let selectedCardsArr = compareCards.map((card) => card.category);
      const allEqual = (arr) => arr.every((val) => val === arr[0]);
      console.log(allEqual(selectedCardsArr));
      // if(allEqual(selectedCardsArr)){

      // }
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
          <DeselectAllButton onClick={handleDeselectAll} />
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
