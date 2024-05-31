import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';
import { checkUserAuthentication } from '../authUtils';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaCity, FaCalendarAlt, FaLanguage, FaLinkedin, FaFacebook, FaInstagram, FaPen } from 'react-icons/fa';
import './Profile.css';
import avatar from './assets/avatar.png';

function FreelancerProfile() {
  const [freelancer, setFreelancer] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    profile_picture: '',
    bio: '',
    date_of_birth: null,
    languages_spoken: '',
    linkedin_url: '',
    facebook_url: '',
    instagram_url: '',
    role: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const userData = await checkUserAuthentication();
      if (userData) {
        setFreelancer(userData);
      }
    } catch (error) {
      navigate('/Login');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(BACKEND_ENDPOINT + "api/users/me/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status !== 200) {
        navigate('/Login');
        return;
      }

      const data = await response.json();
      setFreelancer(data);
    } catch (error) {
      console.error('Error fetching freelancer data:', error);
      navigate('/Login');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFreelancer({
      ...freelancer,
      [name]: value
    });
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append('name', freelancer.name);
    formData.append('phone', freelancer.phone);
    formData.append('country', freelancer.country);
    formData.append('city', freelancer.city);
    formData.append('bio', freelancer.bio);
    formData.append('date_of_birth', freelancer.date_of_birth);
    formData.append('languages_spoken', freelancer.languages_spoken);
    formData.append('linkedin_url', freelancer.linkedin_url);
    formData.append('facebook_url', freelancer.facebook_url);
    formData.append('instagram_url', freelancer.instagram_url);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      const response = await fetch(BACKEND_ENDPOINT + `api/users/update-information/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFieldErrors(errorData);
        throw new Error('Failed to update profile.');
      } else {
        setErrorMessage('');
      }

      setEditMode(false);
      fetchUserData();
      setSuccessMessage('Profile updated successfully.');
      setFieldErrors({});
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to update profile.');
    }
  };

  return (
    <div className="container mt-6 mx-auto p-6 items-center flex justify-center bg-gray-200">
      <div className="container bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-center mt-6">
          <img src={freelancer.profile_picture || avatar} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{freelancer.name || "N/A"}</h1>
          <p className="text-gray-600 text-center mb-6">{freelancer.bio}</p>

          <div className="flex justify-center space-x-4 mb-6">
            {freelancer.linkedin_url && (
              <a href={freelancer.linkedin_url} className="text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
            )}
            {freelancer.facebook_url && (
              <a href={freelancer.facebook_url} className="text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
            )}
            {freelancer.instagram_url && (
              <a href={freelancer.instagram_url} className="text-pink-600 hover:text-pink-800" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            )}
          </div>

          <hr className='mb-6' />
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}
          {!editMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 flex items-center"><FaEnvelope className="mr-2" /> <strong>Email:</strong> {freelancer.email}</p>
                </div>
                <div>
                  <p className="text-gray-700 flex items-center"><FaPhone className="mr-2" /> <strong>Phone:</strong> {freelancer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-700 flex items-center"><FaGlobe className="mr-2" /> <strong>Country:</strong> {freelancer.country}</p>
                </div>
                <div>
                  <p className="text-gray-700 flex items-center"><FaCity className="mr-2" /> <strong>City:</strong> {freelancer.city}</p>
                </div>
                <div>
                  <p className="text-gray-700 flex items-center"><FaCalendarAlt className="mr-2" /> <strong>Date of Birth:</strong> {freelancer.date_of_birth || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-700 flex items-center"><FaLanguage className="mr-2" /> <strong>Languages Spoken:</strong> {freelancer.languages_spoken}</p>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  <FaPen className="mr-2" /> Update Information
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 flex items-center"><FaUser className="mr-2" /> Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={freelancer.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm">{fieldErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaEnvelope className="mr-2" /> Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={freelancer.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled // Disable the email field
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaPhone className="mr-2" /> Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={freelancer.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-sm">{fieldErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaGlobe className="mr-2" /> Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={freelancer.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.country && (
                    <p className="text-red-500 text-sm">{fieldErrors.country}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaCity className="mr-2" /> City:</label>
                  <input
                    type="text"
                    name="city"
                    value={freelancer.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.city && (
                    <p className="text-red-500 text-sm">{fieldErrors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaPen className="mr-2" /> Bio:</label>
                  <textarea
                    name="bio"
                    value={freelancer.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.bio && (
                    <p className="text-red-500 text-sm">{fieldErrors.bio}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaCalendarAlt className="mr-2" /> Date of Birth:</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={freelancer.date_of_birth || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.date_of_birth && (
                    <p className="text-red-500 text-sm">{fieldErrors.date_of_birth}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaLanguage className="mr-2" /> Languages Spoken:</label>
                  <input
                    type="text"
                    name="languages_spoken"
                    value={freelancer.languages_spoken}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.languages_spoken && (
                    <p className="text-red-500 text-sm">{fieldErrors.languages_spoken}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaLinkedin className="mr-2" /> LinkedIn URL:</label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={freelancer.linkedin_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.linkedin_url && (
                    <p className="text-red-500 text-sm">{fieldErrors.linkedin_url}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaFacebook className="mr-2" /> Facebook URL:</label>
                  <input
                    type="url"
                    name="facebook_url"
                    value={freelancer.facebook_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.facebook_url && (
                    <p className="text-red-500 text-sm">{fieldErrors.facebook_url}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaInstagram className="mr-2" /> Instagram URL:</label>
                  <input
                    type="url"
                    name="instagram_url"
                    value={freelancer.instagram_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.instagram_url && (
                    <p className="text-red-500 text-sm">{fieldErrors.instagram_url}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 flex items-center"><FaPen className="mr-2" /> Profile Picture:</label>
                  <input
                    type="file"
                    name="profile_picture"
                    onChange={handleProfilePictureChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldErrors.profile_picture && (
                    <p className="text-red-500 text-sm">{fieldErrors.profile_picture}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfile;
