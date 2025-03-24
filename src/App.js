import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import "./App.css";

function App() {
  const token = localStorage.getItem("access_token");

  return (
    <Router>
      <div className="App">
        <h1 className="text-center">Authentication</h1>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={token ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={token ? <DashboardPage /> : <Navigate to="/login" />}
          />{" "}
          {/* Rediriger vers /login si pas de token */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
