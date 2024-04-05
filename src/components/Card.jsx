const Card = ({ name, onClick, category, id }) => {
  return (
    <>
      <div className="card" id={id} onClick={onClick} data-category={category}>
        {name}
      </div>
    </>
  );
};

export default Card;
