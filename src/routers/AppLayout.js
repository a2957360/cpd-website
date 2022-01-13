import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppViews from "../pages";
// import Header from "../components/header";
import Header from "../components/Header";
// import Footer from "../components/footer";
import Footer from "../components/Footer";
const AppLayout = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppViews />
      <Footer />
    </BrowserRouter>
  );
};

export default AppLayout;
