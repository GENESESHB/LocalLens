import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';

const countryCodes = {
  "Morocco": "+212",
  "United States": "+1",
  "France": "+33",
  "Spain": "+34",
  "Canada": "+1",
  "Mexico": "+52",
  "United Kingdom": "+44",
  // Add more countries and their codes as needed
};

const countries = Object.keys(countryCodes);

const RegisterFreelancer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    password1: '',
    password2: '',
    phone: '',
    country: '',
    city: '',
    language1: '',
    language2: '',
    language3: '',
    agreeToPrivacyPolicy: false,
  });

  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (formData.password1 !== formData.password2) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [formData.password1, formData.password2]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'country' && countryCodes[value]) {
      setFormData((prevData) => ({
        ...prevData,
        phone: countryCodes[value],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage({});
    setSuccessMessage('');
    setLoading(true);

    if (!passwordError) {
      try {
        const response = await fetch(BACKEND_ENDPOINT + 'auth/registration/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage(data.detail);
        } else {
          if (data.detail) {
            setErrorMessage(data.detail);
          } else if (data.non_field_errors) {
            setErrorMessage(data.non_field_errors.join(', '));
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage({ detail: 'An unexpected error occurred, please try again later.' });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); 
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Register</h1>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage.detail && (
          <p className="text-red-500 text-center mb-4">{errorMessage.detail}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
          {errorMessage.email && (
            <p className="text-red-500 text-sm">{errorMessage.email.join(', ')}</p>
          )}
          <input
            type="password"
            name="password1"
            placeholder="Password"
            value={formData.password1}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
          {errorMessage.password1 && (
            <p className="text-red-500 text-sm">{errorMessage.password1.join(', ')}</p>
          )}
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <button type="submit" className="mt-6 w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" disabled={loading}>
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : (
              'Register'
            )}
          </button>
          <p className="mt-4 text-gray-600">
            Already have an account ?{' '}
            <span
              onClick={handleLoginRedirect}
              className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
            >
              Back to login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterFreelancer;
