import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ cartCount, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false); 
    navigate("/"); 
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