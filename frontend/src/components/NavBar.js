// src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContextProvider';
import '../styles/NavBar.css'; // Correct CSS import

const NavBar = ({ logout }) => {
  const { user } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/artists">Artists</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {user ? (
        <>
          <span>Welcome, {user.username}!</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;