import "./HomeMain.css";

const HomeMain = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div className="MainContent">
        <h1>Welcome to Tasty Treasures</h1>
      </div>
      <div className="para">
        <p>
          Welcome to Tasty Treasures, where culinary dreams come alive! Explore,
          create, and share your favorite recipes with a community of passionate
          food lovers. Let your taste buds embark on a delicious journey today!
        </p>
      </div>
    </div>
  );
};

export default HomeMain;
