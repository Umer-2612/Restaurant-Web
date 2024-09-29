import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/index";

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
