import React, { useState, useEffect } from 'react';
import logo from './assets/LOCALLENS.png';
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
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirmPassword]);

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
    if (!passwordError) {
      try {
        const response = await fetch(BACKEND_ENDPOINT + 'auth/registration/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
        } else {
          console.error('Failed to register freelancer');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Register</h1>
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
              <input
                type="password"
                name="password1"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <button type="submit" className="mt-6 w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Continue
              </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterFreelancer;