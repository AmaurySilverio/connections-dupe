import LoginButton from "./LoginButton";

const Header = ({ header = "Games" }) => {
  return (
    <>
      <div className="header-container">
        <a>{header}</a>
        <LoginButton />
      </div>
    </>
  );
};

export default Header;
