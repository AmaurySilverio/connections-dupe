import Header from "./components/Header";
import Hero from "./components/Hero";
import Instructions from "./components/Instructions";
import GameBoard from "./components/GameBoard";

function App() {
  const handleInstructionsClick = () => {
    console.log("clicked");
  };
  const handleMouseEnter = (event) => {
    event.target.style.background = "Gainsboro";
  };
  const handleMouseLeave = (event) => {
    event.target.style.background = "white";
  };

  return (
    <>
      <Header />
      <Hero />
      <Instructions
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleInstructionsClick}
      />
      <GameBoard />
    </>
  );
}

export default App;
