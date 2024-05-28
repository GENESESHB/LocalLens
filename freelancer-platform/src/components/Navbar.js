// src/components/Navbar.js
import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faBriefcase, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from '../pages/assets/locl.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Example login data, replace with actual data from your form or context
        const loginData = new FormData();
        loginData.append('username', 'exampleUsername');
        loginData.append('password', 'examplePassword');

        // Fetch the authentication token
        const loginResponse = await fetch('/auth/login/', {
          method: 'POST',
          body: loginData,
        });

        if (loginResponse.ok) {
          const loginResult = await loginResponse.json();
          const { access, refresh, user } = loginResult;

          // Save tokens to localStorage or state if needed
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);

          // Set the user information in the state
          setUser(user);
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="./">
              <img src={logo} alt="LocalLens Logo" className="logo" />
          </Link>
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
            {user ? ( // Check if user is authenticated
              <li>
                <Link to="/profile" onClick={toggleMenu}>
                  {/* Render user's photo */}
                  <div className="user-profile">
                    <img src={user.photo} alt="User" />
                  </div>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/Login" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faSignInAlt} className="fa-icon" /> Login/Register
                </Link>
              </li>
            )}
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
