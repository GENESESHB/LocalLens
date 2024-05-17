// src/components/Navbar.js
import './Navbar.css';  // Import the CSS file
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faBriefcase, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Correct import for faEnvelope

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyApp</Link>
        </div>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/Experience" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBriefcase} className="fa-icon" /> Experience
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faEnvelope} className="fa-icon" /> Contact Us
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUser} className="fa-icon" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/Login-Register" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faSignInAlt} className="fa-icon" /> Login/Register
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

