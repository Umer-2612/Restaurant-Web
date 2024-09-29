import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Menu from "../pages/Menu";
import Reservation from "../pages/Reservation";
import { menuItems } from "../data/menuItems";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/menu" element={<Menu menuItems={menuItems} />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  );
};

export default AppRoutes;
