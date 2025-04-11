import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ cartCount, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT token
    setIsAuthenticated(false); // Update authentication state
    navigate("/"); // Redirect to Login page
  };

  return (
    <header className="header">
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;