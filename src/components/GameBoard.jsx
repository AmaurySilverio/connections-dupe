import { useState, useEffect } from "react";
import MistakesRemaining from "./MistakesRemaining";
import ShuffleButton from "./ShuffleButton";
import DeselectAllButton from "./DeselectAllButton";
import SubmitButton from "./SubmitButton";
import ViewResultsButton from "./ViewResultsButton";
import Card from "./Card";
import MatchingBanners from "./MatchingBanners";
import WinnerModal from "./WinnerModal";
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
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  // MATCHING CARD BANNERS
  let categoriesArrCopy = [...categoriesArr];
  let sortedCards = categoriesArrCopy.sort(function (a, b) {
    return a.id - b.id;
  });
  console.log(sortedCards);
  let sortedCardNames = sortedCards.map((card) => card.name);
  console.log(sortedCardNames);
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
    console.log(sortedCategoriesArr);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWinnerModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
    // if (cardCount >= 1) {
    //   setClickedCardsCopy(
    //     clickedCardsCopy.map((card) => card.removeAttribute("data-status"))
    //   );
    //   setClickedCardsCopy([]);
    //   setCompareCards([]);
    //   setCardCount(0);
    // }
    // document.getElementsByClassName("deselect").disabled = false;
    console.log("insidde deselect button");
    setClickedCardsCopy(
      clickedCardsCopy.map((card) => card.removeAttribute("data-status"))
    );
    setClickedCardsCopy([]);
    setCompareCards([]);
    setCardCount(0);
  };
  // const fourCardsSelected = () => {
  //   if (cardCount === 4) {
  //     setSubmitButton(true);
  //     console.log(submitButton);
  //   }
  // };
  // fourCardsSelected();
  // CARD CLICK FUNCTION
  const handleCardClick = (event) => {
    // let example = document.getElementById("deselect");
    // console.log(example, "deselect button");
    // example.removeAttribute("onClick");
    // console.log(example, "deselect button");

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
    // LOGIC FOR CLICKING CLICKED CARD
    if (cardAttributes["hasOwnProperty"]("data-status")) {
      event.target.removeAttribute("data-status");
      const updatedCardCount = cardCount - 1;
      setCardCount(updatedCardCount);
      console.log(cardCount, "CC");
      let cardId = cardAttributes["id"].value;
      setCompareCards(compareCards.filter((card) => card.id !== cardId));
      setClickedCardsCopy(
        clickedCardsCopy.filter((card) => card.id !== cardId)
      );
      // if (cardCount === 0) {
      //   setdeselectAllButton(true);
      // }
      // WHEN I REMOVE DATASTATUS, I ALSO NEED TO REMOVE CARD FROM CARDS COPY ARRAY

      // setClickedCardsCopy(clickedCardsCopy.concat(cardClicked));
      // console.log(clickedCardsCopy, "clickedCardCopy");
      // WORKING ON THIS clickedCardsCopy state to hold cards clicked and remove data-catagorty set on cards once deselect all is selected
    } else {
      if (cardCount === 4) {
        // setSubmitButtonClick(false);
        return;
      }
      // if (cardCount === 0) {
      //   setdeselectAllButton(true);
      // }
      event.target.setAttribute("data-status", "clicked");
      const updatedCardCount = cardCount + 1;
      setCardCount(updatedCardCount);
      console.log(cardCount, "CC");
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
      // if (cardCount === 0) {
      //   setdeselectAllButton(true);
      // } else {
      //   setdeselectAllButton(false);
      // }
      // cardCount < 1 ? setdeselectAllButton(true) : setdeselectAllButton(false);
      // setCompareCards(compareCards.concat(cardCategory));
      // console.log(compareCards);
      // console.log(cardId);
    }
  };
  // SUBMIT BUTTON FUNCTION
  const handleSubmit = (event) => {
    console.log(compareCards);
    console.log(event);
    let cards = event.target.parentElement.parentElement.children[0].children;
    console.log(cards);
    let submittedCards = Array.from(cards).filter((card) => card.attributes[4]);
    console.log(submittedCards);
    submittedCards.map((card) => card.setAttribute("class", "card-submitted"));

    console.log("submit clicked");
    // if (cardCount !== 4) {
    //   console.log("You need to have four cards highlighted to submit");
    //   return;
    // }
    // else {
    let attemptedCardsDifficulty = compareCards.map((card) => card.difficulty);
    let attemptCardsIDs = compareCards.map((card) => card.id);
    attemptCardsIDs.sort(function (a, b) {
      return a - b;
    });
    let currentAttempt = {
      difficulty: attemptedCardsDifficulty,
      id: attemptCardsIDs,
    };
    setAttempts(attempts.concat(currentAttempt));

    let previousAttemptIds = attempts.map((card) => card.id);
    // .sort(function (a, b) {
    //   return a - b;
    // })
    console.log(previousAttemptIds);
    console.log(attemptCardsIDs);
    // STOPPED HERE
    let previousAttempt = false;
    previousAttemptIds.map((cardIds) => {
      if (cardIds.join(",") === attemptCardsIDs.join(",")) {
        previousAttempt = true;
        setSameGuess(true);
      }
    });
    console.log(previousAttempt);
    // if (sameGuess) {
    //   setSameGuess(false);
    //   return;
    // }
    let selectedCardsArr = compareCards.map((card) => card.category);
    const allEqual = (arr) => arr.every((val) => val === arr[0]);
    if (!allEqual(selectedCardsArr)) {
      if (mistakesRemaining === 1) {
        // compare matchedCards state to randomVarr array and see whats missing.
        // push whats missing into matched cards state
        let matchedCardsDifficulty = matchedCards.map(
          (card) => card.difficulty
        );
        let remainingSortedCategories = sortedCategories.filter(
          (card) => !matchedCardsDifficulty.includes(card.difficulty)
        );
        console.log(remainingSortedCategories, "HELLO YOU");
        setMatchedCards(matchedCards.concat(remainingSortedCategories));

        categoriesArr = [];
        setClickedCardsCopy([]);
        setCompareCards([]);
        setCardCount(0);
      }
      if (previousAttempt) {
        previousAttempt = false;
        setTimeout(() => {
          setSameGuess(false);
        }, 1000);
        return;
      } else {
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
      setTimeout(() => {
        submittedCards.map((card) => card.removeAttribute("class"));
        submittedCards.map((card) => card.setAttribute("class", "card"));
        // setSameGuess(false);
      }, 1000);
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
      let matchedCardsCategory = compareCards.map((card) => card.difficulty);
      // let matchedCardIdsCopy = [...matchedCardIds];
      // matchedCardIdsCopy.sort((a, b) => a - b);
      // console.log(matchedCardIdsCopy);
      matchedCardIds.sort((a, b) => a - b);
      console.log(matchedCardsCategory);
      console.log(matchedCardIds);
      let remainingCards = categoriesArr.filter(
        (card) => !matchedCardIds.includes(card.id)
      );
      setRemainingCardsInPlay(remainingCards);
      let difficultyKey = matchedCardsCategory[0];
      let obj = { difficulty: difficultyKey };
      console.log(obj);
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
        //make id's same!!!!!
      };
      console.log(matchingCardsBannerData);
      setMatchedCards(matchedCards.concat(matchingCardsBannerData));
      // let matchedCards = [...clickedCardsCopy];
      categoriesArr = [...remainingCards];
      setClickedCardsCopy([]);
      setCompareCards([]);
      setCardCount(0);
      console.log(remainingCards);
      console.log(matchedCards);
      // if (matchedCards === 4) {
      //   winnerModal();
      // }
    }
    // }
  };
  console.log(matchedCards);
  const handleModalClose = (event) => {
    setModal(true);
    console.log("closed");
  };
  const handleViewResults = () => {
    setModal(false);
    console.log("JAJAJA");
  };

  return (
    <>
      <SameGuess show={sameGuess} />
      {/* <h3 className="create-title">Create four groups of four!</h3> */}
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
          <WinnerModal
            show={matchedCards.length === 4 && mistakesRemaining >= 1}
            onClick={handleModalClose}
            closeModal={modal}
            attempts={attempts}
            text="Good job!"
          />
          {showWinnerModal ? (
            <WinnerModal
              show={mistakesRemaining === 0}
              onClick={handleModalClose}
              closeModal={modal}
              attempts={attempts}
              text="Next Time!"
            />
          ) : null}
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
