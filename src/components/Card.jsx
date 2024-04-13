const Card = ({ name, onClick, category, difficulty, id }) => {
  return (
    <>
      <div
        className="card"
        id={id}
        onClick={onClick}
        data-category={category}
        data-difficulty={difficulty}
      >
        {name}
      </div>
    </>
  );
};

export default Card;
