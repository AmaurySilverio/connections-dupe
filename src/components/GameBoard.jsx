import { useState, useEffect } from "react";
import MistakesRemaining from "./MistakesRemaining";
import ShuffleButton from "./ShuffleButton";
import DeselectAllButton from "./DeselectAllButton";
import SubmitButton from "./SubmitButton";
import ViewResultsButton from "./ViewResultsButton";
import Card from "./Card";
import MatchingBanners from "./MatchingBanners";
import ResultsModal from "./ResultsModal";
import SameGuess from "./SameGuess";
import categories from "../../categories.json";

let categoriesArr = [...categories];

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
  const [attempts, setAttempts] = useState([]);
  const [modal, setModal] = useState(false);
  const [sameGuess, setSameGuess] = useState(false);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // MATCHING CARD BANNERS
  let categoriesArrCopy = [...categoriesArr];
  let sortedCards = categoriesArrCopy.sort(function (a, b) {
    return a.id - b.id;
  });
  let sortedCardNames = sortedCards.map((card) => card.name);
  useEffect(() => {
    let sortedCategoriesArr = [
      {
        names: {
          name1: sortedCardNames[0],
          name2: sortedCardNames[1],
          name3: sortedCardNames[2],
          name4: sortedCardNames[3],
        },
        id: sortedCards[0].id,
        category: sortedCards[0].category,
        difficulty: sortedCards[0].difficulty,
      },
      {
        names: {
          name1: sortedCardNames[4],
          name2: sortedCardNames[5],
          name3: sortedCardNames[6],
          name4: sortedCardNames[7],
        },
        id: sortedCards[4].id,
        category: sortedCards[4].category,
        difficulty: sortedCards[4].difficulty,
      },
      {
        names: {
          name1: sortedCardNames[8],
          name2: sortedCardNames[9],
          name3: sortedCardNames[10],
          name4: sortedCardNames[11],
        },
        id: sortedCards[8].id,
        category: sortedCards[8].category,
        difficulty: sortedCards[8].difficulty,
      },
      {
        names: {
          name1: sortedCardNames[12],
          name2: sortedCardNames[13],
          name3: sortedCardNames[14],
          name4: sortedCardNames[15],
        },
        id: sortedCards[12].id,
        category: sortedCards[12].category,
        difficulty: sortedCards[12].difficulty,
      },
    ];
    setSortedCategories(sortedCategories.concat(sortedCategoriesArr));
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowResultsModal(true);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);

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
    setClickedCardsCopy(
      clickedCardsCopy.map((card) => card.removeAttribute("data-status"))
    );
    setClickedCardsCopy([]);
    setCompareCards([]);
    setCardCount(0);
  };

  // CARD CLICK FUNCTION
  const handleCardClick = (event) => {
    if (mistakeBubbles.length < 1) {
      let mistakeBubblesDOM =
        event.target.parentElement.nextElementSibling.children[0].children[0]
          .children;
      let mistakesArr = [...mistakeBubblesDOM];
      setMistakeBubbles(mistakeBubbles.concat(mistakesArr));
    }

    let cardAttributes = event.target.attributes;
    // LOGIC FOR CLICKING CLICKED CARD
    if (cardAttributes["hasOwnProperty"]("data-status")) {
      event.target.removeAttribute("data-status");
      const updatedCardCount = cardCount - 1;
      setCardCount(updatedCardCount);
      let cardId = cardAttributes["id"].value;
      setCompareCards(compareCards.filter((card) => card.id !== cardId));
      setClickedCardsCopy(
        clickedCardsCopy.filter((card) => card.id !== cardId)
      );
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
    }
  };
  // SUBMIT BUTTON FUNCTION
  const handleSubmit = (event) => {
    let cards = event.target.parentElement.parentElement.children[0].children;
    let submittedCards = Array.from(cards).filter((card) => card.attributes[4]);
    submittedCards.map((card) => card.setAttribute("class", "card-submitted"));

    let attemptedCardsDifficulty = compareCards.map((card) => card.difficulty);
    let attemptCardsIDs = compareCards.map((card) => card.id);
    attemptCardsIDs.sort(function (a, b) {
      return a - b;
    });
    let currentAttempt = {
      difficulty: attemptedCardsDifficulty,
      id: attemptCardsIDs,
    };

    let previousAttemptIds = attempts.map((card) => card.id);

    let previousAttempt = false;
    previousAttemptIds.map((cardIds) => {
      if (cardIds.join(",") === attemptCardsIDs.join(",")) {
        previousAttempt = true;
        setSameGuess(true);
      }
    });
    previousAttempt ? null : setAttempts(attempts.concat(currentAttempt));

    let selectedCardsArr = compareCards.map((card) => card.category);
    const allEqual = (arr) => arr.every((val) => val === arr[0]);
    if (!allEqual(selectedCardsArr)) {
      setTimeout(() => {
        submittedCards.map((card) => card.setAttribute("class", "wrong-guess"));
      }, 1000);
      if (mistakesRemaining === 1 && !previousAttempt) {
        let matchedCardsDifficulty = matchedCards.map(
          (card) => card.difficulty
        );
        let remainingSortedCategories = sortedCategories.filter(
          (card) => !matchedCardsDifficulty.includes(card.difficulty)
        );
        setTimeout(() => {
          setMatchedCards(matchedCards.concat(remainingSortedCategories));
          categoriesArr = [];
          setClickedCardsCopy([]);
          setCompareCards([]);
          setCardCount(0);
        }, 2000);
      }
      if (previousAttempt) {
        previousAttempt = false;
        setTimeout(() => {
          setSameGuess(false);
          submittedCards.map((card) => card.removeAttribute("class"));
          submittedCards.map((card) => card.setAttribute("class", "card"));
        }, 2000);
        return;
      } else {
        mistakeBubbles.map((bubble) => {
          if (bubble.attributes[1].value === mistakesRemaining.toString()) {
            setTimeout(() => {
              bubble.setAttribute("data-hidden", "hidden");
            }, 1400);
          }
        });
        setTimeout(() => {
          const updatedMistakesRemaining = mistakesRemaining - 1;
          setMistakesRemaining(updatedMistakesRemaining);
        }, 2000);
      }
      setTimeout(() => {
        submittedCards.map((card) => card.removeAttribute("class"));
        submittedCards.map((card) => card.setAttribute("class", "card"));
      }, 2000);
    }
    if (allEqual(selectedCardsArr)) {
      setTimeout(() => {
        submittedCards.map((card) =>
          card.setAttribute("class", "correct-guess")
        );
      }, 1000);

      let matchedCardIds = clickedCardsCopy.map((card) => card.id);
      let matchedCardsCategory = compareCards.map((card) => card.difficulty);

      matchedCardIds.sort((a, b) => a - b);
      let remainingCards = categoriesArr.filter(
        (card) => !matchedCardIds.includes(card.id)
      );
      setRemainingCardsInPlay(remainingCards);
      let difficultyKey = matchedCardsCategory[0];
      let obj = { difficulty: difficultyKey };
      let matchingCardsBannerData = {
        names: {
          name1: compareCards[0].name,
          name2: compareCards[1].name,
          name3: compareCards[2].name,
          name4: compareCards[3].name,
        },
        category: selectedCardsArr[0],
        difficulty: compareCards[0].difficulty,
        id: matchedCardIds[0],
      };
      setTimeout(() => {
        setMatchedCards(matchedCards.concat(matchingCardsBannerData));
        categoriesArr = [...remainingCards];
      }, 2000);

      setClickedCardsCopy([]);
      setCompareCards([]);
      setCardCount(0);
    }
  };
  const handleModalClose = (event) => {
    setModal(true);
  };
  const handleViewResults = () => {
    setModal(false);
  };

  return (
    <>
      <SameGuess show={sameGuess} />
      <div className="gameboard-container">
        <div className="grid grid-cols-4 gap-2">
          {matchedCards.length >= 1 && mistakesRemaining >= 1
            ? matchedCards.map((card) => (
                <MatchingBanners
                  key={card.id}
                  names={card.names}
                  category={card.category}
                  id={card.difficulty}
                />
              ))
            : null}
          {mistakesRemaining === 0
            ? matchedCards.map((card) => (
                <MatchingBanners
                  key={card.id}
                  names={card.names}
                  category={card.category}
                  id={card.difficulty}
                />
              ))
            : null}
          <ResultsModal
            show={matchedCards.length === 4 && mistakesRemaining >= 1}
            onClick={handleModalClose}
            closeModal={modal}
            attempts={attempts}
            text="Good job!"
          />
          {/* {showResultsModal ? ( */}
          <ResultsModal
            show={matchedCards.length === 4 && mistakesRemaining === 0}
            onClick={handleModalClose}
            closeModal={modal}
            attempts={attempts}
            text="Next Time!"
          />
          {/* ) : null} */}
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
        <MistakesRemaining
          show={matchedCards.length <= 3 && mistakesRemaining >= 1}
        />
        <div className="buttons">
          <ShuffleButton
            show={matchedCards.length <= 3 && mistakesRemaining >= 1}
            onClick={handleShuffle}
          />
          <DeselectAllButton
            show={matchedCards.length <= 3 && mistakesRemaining >= 1}
            disabled={!cardCount > 0}
            onClick={handleDeselectAll}
          />
          <SubmitButton
            show={matchedCards.length <= 3 && mistakesRemaining >= 1}
            disabled={cardCount !== 4}
            onClick={handleSubmit}
          />
          <ViewResultsButton
            show={matchedCards.length === 4 || mistakesRemaining === 0}
            onClick={handleViewResults}
          />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
