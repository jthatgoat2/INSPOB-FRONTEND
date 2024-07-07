import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "../Pages/aboutPage/AboutPage";
import FutureFeature from "../Pages/futureFeature/FutureFeatures";
import CanvasPage from "../Pages/canvasPage/CanvasPage";
import DashboardPage from "../Pages/dashboardPage/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/canvas" element={<CanvasPage />} />
        <Route path="/future-updates" element={<FutureFeature />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
