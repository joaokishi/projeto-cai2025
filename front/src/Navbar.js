import React from 'react';
import './Navbar.css';

function Navbar({ currentPage, setPage }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Book Manager</h1>
      <div className="navbar-links">
        <button
          className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setPage('home')}
        >
          Home
        </button>
        <button
          className={`nav-button ${currentPage === 'add' ? 'active' : ''}`}
          onClick={() => setPage('add')}
        >
          Add
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
