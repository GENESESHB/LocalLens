import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginRegister.css';
import googleLogo from './assets/google-logo.png';
import facebookLogo from './assets/facebook-logo.png';

function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/login/google/';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:8000/auth/login/facebook/';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
    } else {
      console.error('Login failed:', data);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/RegisterFreelancer'); // Use navigate to redirect
  };

  return (
    <div className="login-register-container">
      <h1> Welcome to LocalLens</h1>
      <p> let your travel be a movie </p>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div className="social-buttons">
        <button className="social-button google-button" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google logo" /> Login with Google
        </button>
        <button className="social-button facebook-button" onClick={handleFacebookLogin}>
          <img src={facebookLogo} alt="Facebook logo" />Login with facebook
        </button>
      </div>

      <button className="freelancer-button" onClick={handleRegisterRedirect}>
        Register as Freelancer
      </button>
    </div>
  );
}

export default LoginRegister;

