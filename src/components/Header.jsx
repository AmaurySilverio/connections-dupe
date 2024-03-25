const Header = ({ header = "Games" }) => {
  return (
    <>
      <div className="header-container">
        <a>{header}</a>
      </div>
    </>
  );
};

export default Header;
