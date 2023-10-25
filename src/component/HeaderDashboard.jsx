import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Icon } from '@iconify/react';
import details from '../assets/details.png'
import '../styles/headerDashboard.css'
import useIcon from "../assets/user-128_nathan.png"
import { useAuth } from "../contextData/DataContext";


const HeaderDashboard = () => {
  const {userDetails,logout} = useAuth()
  return (
    <div className=" dasherrrr ">

      <Navbar expand="lg" className="  head">
        <Container>
          <Navbar.Brand className="">
            <div className="text-decoration-none">

              <h1 className="text-white ps-md-4">Dashboard</h1>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="ms-auto my-2 my-lg-0 d-flex ">
              <div className="mt  ">
                <Nav
                  className="m-auto my-2 my-lg-0 justify-content-betwee gap-3"
                  navbarScroll
                >
                  <div className="d-flex  shehu-kk mt-lg-3 ">
                    <Form className="d-flex kk me-lg-3 mt-lg- ">
                    <box-icon name='search' color='#ffffff' ></box-icon>   
                      <input type="text " placeholder="search" className="inp"/>
                    </Form>
                    <Link
                      to="" className="text-decoration-none tag mt-lg-2 ">
                     <Icon icon="mdi:bell-notification-outline" color="white" width="40" height="40"  />
                    </Link>
                  </div>
                  <Link className="text-decoration-none text-white d-flex mt-lg-3 fw-bold tag ms-3  align-items-center  shehu-head-tag">
                    <img src={userDetails.image?userDetails.image:useIcon} alt="" className="rounded-circle border-black border border-white img-fluid"/> <p className="px-lg-2 px-1 ">{userDetails.full_name && userDetails.full_name } </p> 
                    <select name="" id="" onChange={logout}><option value=""></option>
                    <option value={""}>logout</option>
                    </select>
                    
                  </Link>
                 

                </Nav>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default HeaderDashboard