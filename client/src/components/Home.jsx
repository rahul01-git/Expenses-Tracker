import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";
import Header from "./Header";
import Amount from "./Amount";
import Tags from "./Tags";
import Expenses from "./Expenses";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="border-4 border-red-500 p-3 max-w-screen-lg mx-auto max-h-full">
      <Header />
      <Amount />
      <OptionsMenu />
      <Routes>
        <Route exact path="/tags" element={<Tags />} />
        <Route exact path="/expenses" element={<Expenses />} />
        <Route exact path="/category" element={<Categories />} />
      </Routes>
    </div>
  );
};

export default Home;
