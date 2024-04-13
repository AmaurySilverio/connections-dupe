import { useState } from "react";
import MistakesRemaining from "./MistakesRemaining";
import ShuffleButton from "./ShuffleButton";
import DeselectAllButton from "./DeselectAllButton";
import SubmitButton from "./SubmitButton";
import Card from "./Card";
import MatchingBanners from "./MatchingBanners";
import categories from "../../categories.json";

let categoriesArr = categories;

const GameBoard = () => {
  const [shuffle, setShuffle] = useState(false);
  const [cardCount, setCardCount] = useState(0);
  // maybe i can combine these two states in the future. they do esentially the same thing
  const [clickedCardsCopy, setClickedCardsCopy] = useState([]);
  const [compareCards, setCompareCards] = useState([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [mistakeBubbles, setMistakeBubbles] = useState([]);
  const [remainingCardsInPlay, setRemainingCardsInPlay] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
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
    if (mistakeBubbles.length < 1) {
      let mistakeBubblesDOM =
        event.target.parentElement.nextElementSibling.children[0].children[0]
          .children;
      let mistakesArr = [...mistakeBubblesDOM];
      setMistakeBubbles(mistakeBubbles.concat(mistakesArr));
    }
    console.log(
      "bubbles",
      event.target.parentElement.nextElementSibling.children[0].children[0]
        .children
    );
    // let mistakeBubblesDOM =
    //   event.target.parentElement.nextElementSibling.children[0].children[0]
    //     .children;
    // setMistakeBubbles(mistakeBubbles.concat(mistakeBubblesDOM));
    console.log(mistakeBubbles);

    let cardAttributes = event.target.attributes;
    if (cardAttributes["hasOwnProperty"]("data-status")) {
      event.target.removeAttribute("data-status");
      const updatedCardCount = cardCount - 1;
      setCardCount(updatedCardCount);

      let cardId = cardAttributes["id"].value;
      setCompareCards(compareCards.filter((card) => card.id !== cardId));
      setClickedCardsCopy(
        clickedCardsCopy.filter((card) => card.id !== cardId)
      );
      // WHEN I REMOVE DATASTATUS, I ALSO NEED TO REMOVE CARD FROM CARDS COPY ARRAY

      // setClickedCardsCopy(clickedCardsCopy.concat(cardClicked));
      // console.log(clickedCardsCopy, "clickedCardCopy");
      // WORKING ON THIS clickedCardsCopy state to hold cards clicked and remove data-catagorty set on cards once deselect all is selected
    } else {
      if (cardCount === 4) {
        return;
      }
      event.target.setAttribute("data-status", "clicked");
      const updatedCardCount = cardCount + 1;
      setCardCount(updatedCardCount);
      let cardName = event.target.innerHTML;
      let cardId = cardAttributes["id"].value;
      let cardCategory = cardAttributes["data-category"].value;
      let cardDifficulty = cardAttributes["data-difficulty"].value;
      const clickedCard = {
        name: cardName,
        id: cardId,
        category: cardCategory,
        difficulty: cardDifficulty,
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
  const handleSubmit = (event) => {
    // console.log(event);
    // console.log(event.target.parentElement.previousElementSibling);
    // let mistakeBubbles =
    //   event.target.parentElement.previousElementSibling.children[0].children[0]
    //     .children;
    console.log("submit clicked");
    if (cardCount !== 4) {
      console.log("You need to have four cards highlighted to submit");
      return;
    } else {
      let selectedCardsArr = compareCards.map((card) => card.category);
      const allEqual = (arr) => arr.every((val) => val === arr[0]);
      if (!allEqual(selectedCardsArr)) {
        if (mistakesRemaining === 1) {
          alert("GAME OVER");
        }
        mistakeBubbles.map((bubble) => {
          console.log("made it in");
          if (bubble.attributes[1].value === mistakesRemaining.toString()) {
            bubble.setAttribute("data-hidden", "hidden");
          }
        });
        const updatedMistakesRemaining = mistakesRemaining - 1;
        setMistakesRemaining(updatedMistakesRemaining);
        console.log("mistakes remaining", updatedMistakesRemaining);
      }
      if (allEqual(selectedCardsArr)) {
        console.log("Match!");
        console.log(
          "clickedcardscopy",
          clickedCardsCopy,
          "categoriesArr",
          categoriesArr
        );

        let matchedCardIds = clickedCardsCopy.map((card) => card.id);

        console.log(matchedCardIds);
        let remainingCards = categoriesArr.filter(
          (card) => !matchedCardIds.includes(card.id)
        );
        setRemainingCardsInPlay(remainingCards);
        let matchingCardsBannerData = {
          names: {
            name1: compareCards[0].name,
            name2: compareCards[1].name,
            name3: compareCards[2].name,
            name4: compareCards[3].name,
          },
          category: selectedCardsArr[0],
          difficulty: compareCards[0].difficulty,
          id: matchedCards.length + 1,
        };
        setMatchedCards(matchedCards.concat(matchingCardsBannerData));
        // let matchedCards = [...clickedCardsCopy];
        categoriesArr = [...remainingCards];
        setClickedCardsCopy([]);
        setCompareCards([]);
        setCardCount(0);

        console.log(remainingCards);
      }
    }
  };

  return (
    <>
      <h3 className="create-title">Create four groups of four!</h3>
      <div className="gameboard-container">
        <div className="grid grid-cols-4 gap-2">
          {matchedCards.length >= 1
            ? matchedCards.map((card) => (
                <MatchingBanners
                  key={card.id}
                  names={card.names}
                  category={card.category}
                  id={card.difficulty}
                />
              ))
            : console.log("matchedBannerlog")}

          {categoriesArr.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              category={card.category}
              difficulty={card.difficulty}
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
