import React from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Cards />
    </React.Fragment>
  );
};

export default App;
