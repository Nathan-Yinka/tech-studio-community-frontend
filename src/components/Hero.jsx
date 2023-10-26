import React from "react";
import "../styles/hero.css";
import HeroImg from "../assets/HeroImage.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contextData/DataContext";

const Hero = () => {
  const {token} = useAuth()
  return (
    <div className="Container hero-sec mt-5">
      <div>
        <img className="w-100 h-100" src={HeroImg} alt="" />
      </div>
      <div className="hero-text mt-3">
        <h2>Explore, Connect And Innovate</h2>
        <p>
          Dive into a world of limitless possibilities, where coding languages
          speak louder than words and digital innovations shape the future.
          Engage in discussions, collaborate on projects, and build lasting
          relationships that could shape your tech journey.
        </p>
        { !token ?
        <Link to={"/login"}>
          <div
            type="button"
            className="btn btn-primary p-2 fs-5 fw-bold rounded mt-md-5 col-10"
          >
            Join Community
          </div>
        </Link>:
        <Link to={"/dashboard"}>
        <div
            type="button"
            className="btn btn-primary p-2 fs-5 fw-bold rounded mt-md-5 col-10"
          >
            Go To DashBoard
          </div>
        </Link>}
      </div>
    </div>
  );
};

export default Hero;
