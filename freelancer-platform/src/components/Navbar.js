// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBars, faEnvelope, faSignInAlt, faUser, faSignOutAlt, faInfoCircle, faTools } from '@fortawesome/free-solid-svg-icons';
import logo from '../pages/assets/local.png';
import { BACKEND_ENDPOINT } from '../constants';
import { UserContext } from '../UserContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(BACKEND_ENDPOINT + 'auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        setUser(null);
        navigate('/');
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="LocalLens Logo" className="h-10" />
          </Link>
        </div>
        <div className={`flex-1 md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row md:ml-auto">
            {/* <li className="md:ml-4 mt-2 md:mt-0">
              <Link to="/Experience" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> Experience
              </Link>
            </li> */}
            <li className="md:ml-4 mt-2 md:mt-0">
              <Link to="/ContactUs" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About Us
              </Link>
            </li>
            {user ? (
              <>
                <li className="md:ml-4 mt-2 md:mt-0">
                  <Link to="/Profile" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
                  </Link>
                </li>
                <li className="md:ml-4 mt-2 md:mt-0">
                  <Link to="/MyServices" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faTools} className="mr-2" /> My Services
                  </Link>
                </li>
                <li className="md:ml-4 mt-2 md:mt-0">
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:text-gray-600 flex items-center"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="md:ml-4 mt-2 md:mt-0">
                <Link to="/Login" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login/Register
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="md:hidden" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-gray-800" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
