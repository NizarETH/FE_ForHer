import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-center">ForHer Authentication</h1>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<LoginPage />} /> {/* Page par défaut */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
