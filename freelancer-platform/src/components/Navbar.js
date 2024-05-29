import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from '../pages/assets/locl.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    // Fetch user information after authentication
    const fetchUserData = async () => {
      try {
        // Make a request to your backend to get user information
        const response = await fetch('http://localhost:8000/api/users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null); // Clear user state if authentication fails
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Clear user state if an error occurs
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
