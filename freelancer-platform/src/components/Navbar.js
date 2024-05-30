import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBars, faEnvelope, faSignInAlt, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../pages/assets/local.png';
import { BACKEND_ENDPOINT } from '../constants';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(BACKEND_ENDPOINT + 'api/users/me/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="./">
            <img src={logo} alt="LocalLens Logo" className="h-10" />
          </Link>
        </div>
        <div className="relative flex-1 top-2 flex justify-center md:justify-end">
          <div className="relative hidden md:flex items-center w-full max-w-md mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 text-gray-500 hover:text-gray-700"
            />
          </div>
          <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
            <ul className="flex flex-col md:flex-row md:ml-auto items-center">
              <li className="md:ml-4 mt-2 md:mt-0">
                <Link to="/Experience" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> Experience
                </Link>
              </li>
              <li className="md:ml-4 mt-2 md:mt-0">
                <Link to="/ContactUs" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact Us
                </Link>
              </li>
              {user ? (
                <li className="md:ml-4 mt-2 md:mt-0">
                  <Link to="/Profile" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
                  </Link>
                </li>
              ) : (
                <li className="md:ml-4 mt-2 md:mt-0">
                  <Link to="/Login" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login/Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="md:hidden" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-gray-800" />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          <div className="relative flex items-center w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 text-gray-500 hover:text-gray-700"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

