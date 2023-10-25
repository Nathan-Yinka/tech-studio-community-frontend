import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import Logo from "../assets/TSALOGO.png";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { Container } from "react-bootstrap";
const Footer = () => {
  return (
    <div>
      <div className="footer-division ">
        <div className="d-md-flex mt-5 py-5 Child-division container">
          <div className="Master  ">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
            <p>
              Welcome to Tech studio community hub, where you connect with
              fellow tech enthusiasts, share knowledge, and explore endless
              possibilities.
            </p>
          </div>
          <div className="menu-list ">
            <b>Quick Menu</b>
            <Link to="/dashboard" className="text-decoration-none text-start ">
              <p>Community</p>
            </Link>
            <Link to="/talent" className="text-decoration-none text-start ">
              <p>Find Talent</p>
            </Link>
            <Link to="/" className="text-decoration-none text-start">
              <p>Go to Main Website</p>
            </Link>{" "}
          </div>

          <div className="news-part">
            <h3>Subscribe to our newsletter</h3>
            <div className="d-flex newsin ">
              <input type="email" placeholder="Email address" />
              <button>
                Subscribe <BsArrowRightShort />{" "}
              </button>
            </div>
          </div>
        </div>
        <hr className="mx-5" />
        <div className="d-flex justify-content-center me-5 pb-3 Policy">
          <b>Terms and Policy</b>
          <p>
            {" "}
            <AiOutlineTwitter />
          </p>
          <p>
            <BiLogoInstagram />
          </p>
          <p>
            {" "}
            <BiLogoFacebook />
          </p>
          <p>
            <FaLinkedinIn />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
