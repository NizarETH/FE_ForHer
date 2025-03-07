import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      setMessage("Login successful");
      setError("");
      navigate("/dashboard"); // Redirige vers le dashboard après une connexion réussie
    } catch (err) {
      // Vérification si err.response et err.response.data existent
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("An unknown error occurred"); // Message d'erreur générique
      }
      setMessage("");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/RegisterPage"); // Redirige vers la page d'inscription
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* Bouton pour rediriger vers la page d'inscription */}
      <button onClick={handleRegisterRedirect} className="register-button">
        Register
      </button>
    </div>
  );
};

export default LoginPage;
