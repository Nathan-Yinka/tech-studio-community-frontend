import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Logo from "../assets/TSALOGO.png"
import "../styles/header.css"
import { useAuth } from '../contextData/DataContext';
import useIcon from "../assets/user-128_nathan.png"

const Header2 = () => {
  const {userDetails,logout} = useAuth()
  return (
    <div className=''>
      <Navbar expand="lg" className="Head">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav " />
          <Navbar.Collapse id="responsive-navbar-nav" className="g-5">
            <Nav className="m-auto p-auto">
              <Link
                to="/dashboard"
                className="text-decoration-none text-white   py-2  fw-bold mx-3 tag"
              >
                Explore Community
              </Link>
              <Link
                to="/talent"
                className="text-decoration-none text-white py-2  fw-bold mx-3 tag"
              >
                Find Talent
              </Link>
              <Link
                to="/dashboard"
                className="text-decoration-none text-white    py-2 fw-bold mx-3 tag"
              >
                For You
              </Link>
            </Nav>
            {Object.keys(userDetails).length === 0 ?
            <Nav>
             
              <Link to="/GuestSignUp">
                <Button
                  variant="primary"
                  className="w-auto  h-auto my-1 text-white  fw-bold mx-2 tag "
                >
                  Register
                </Button>{" "}
              </Link>
              <Link
                to="/login"
                className="text-decoration-none text-white  fw-bold mx-3 my-2 tag"
              >
                Login
              </Link>
            </Nav>:
            <Nav>
             <div onClick={logout}>
                <Button
                  variant="primary"
                  onClick={logout}
                  className="w-auto  h-auto my-1 text-white my-2 fw-bold mx-2 tag "
                >
                  Logout
                </Button>
              </div>
              <div 
                
                className="text-decoration-none text-white  fw-bold mx-3 my-2 tag d-flex gap-1 align-items-center d-none d-lg-flex"
              >
               <div className=''>
               <img src={userDetails.image?userDetails.image:useIcon} alt="" className='img-fluid rounded-circle'/>
               </div>
                  <div className='m-0 text-decoration-none fw-medium'>{userDetails.full_name}</div>
              </div>
            </Nav>
}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header2