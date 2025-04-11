import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token); // Store JWT token
        setIsAuthenticated(true); // Update authentication state
        navigate("/products"); // Redirect to product listing page
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid credentials"); // Display a user-friendly error message
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;