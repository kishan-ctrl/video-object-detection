import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resultpage from "./components/Resultpage";
import UploadVideo from "./components/uploadvideo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadVideo />} />
        <Route path="/results" element={<Resultpage />} />
      </Routes>
    </Router>
  );
};

export default App;
