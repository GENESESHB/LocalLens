import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegisterFreelancer.css';
import logo from './assets/LOCALLENS.png';

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
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: '',
    city: '',
    language: '',
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
        phoneNumber: countryCodes[value],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      // Handle form submission logic
      console.log(formData);
    }
  };

  return (
    <div className="RF">
      <h1>Register as Freelancer
      </h1>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="familyName"
              placeholder="Family Name"
              value={formData.familyName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <button type="button" onClick={() => setCurrentStep(2)}>Continue</button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <select
              name="language1"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="">first language</option>
              <option value="Tamazight">Tamazight</option>
              <option value="DarijaMorocco">DarijaMorocco</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
            <select
              name="language2"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="">seconde language</option>
              <option value="Tamazight">Tamazight</option>
              <option value="DarijaMorocco">DarijaMorocco</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
            <select
              name="language3"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value=""> other language</option>
              <option value="Tamazight">Tamazight</option>
              <option value="DarijaMorocco">DarijaMorocco</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="agreeToPrivacyPolicy"
                  checked={formData.agreeToPrivacyPolicy}
                  onChange={handleChange}
                  required
                />
                I agree to the Privacy Policy
              </label>
            </div>
            <button type="submit">Register</button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegisterFreelancer;

