import React from "react";
import Header2 from "../component/Header2";
import Footer from "../component/Footer";
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
