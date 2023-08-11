import React from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import Home from "./home";
import Zeeve from "./zeeve";
  
const Main = () => {
  return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/zeeve" element={<Zeeve />} />
			<Route path="*" element={<div>Route not found.</div>} />
		</Routes>
  );
};

exportdefault Main;