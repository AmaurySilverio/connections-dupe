const MatchingBanners = ({ names, category, id }) => {
  return (
    <div className="col-span-4" id={id}>
      <div>
        {console.log("matchingbannercomponents")}
        {category}
        <br></br>
        <div className="banner-cardname-container">
          {names.name1}, {names.name2}, {names.name3}, {names.name4}
        </div>
      </div>
    </div>
  );
};

export default MatchingBanners;
