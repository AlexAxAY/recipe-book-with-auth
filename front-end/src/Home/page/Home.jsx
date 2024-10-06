import HomeMain from "../components/HomeMain";
import "./Home.css";
import AuthButtons from "../components/AuthButtons";
import backGroundImage from "../../images/vegetables-set-left-black-slate.jpg";

const Home = () => {
  return (
    <div
      className="Home"
      style={{
        backgroundImage: `url(${backGroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <AuthButtons />
      <HomeMain />
    </div>
  );
};

export default Home;
