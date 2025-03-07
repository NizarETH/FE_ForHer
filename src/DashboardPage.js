import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importez useNavigate

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Utilisez useNavigate ici

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login"); // Redirige vers la page de connexion si le token n'est pas présent
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (err) {
        setError("Unable to fetch user data");
        navigate("/login"); // Redirige vers la page de connexion en cas d'erreur
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {user ? <p>Welcome, {user}!</p> : <p>Loading...</p>}
    </div>
  );
};

export default DashboardPage;
