import React from "react";
import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      <Header2 />
    <Outlet/>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
