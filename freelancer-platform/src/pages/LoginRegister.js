import React, { useState } from 'react';
import './LoginRegister.css';
import googleLogo from './assets/google-logo.png'; // Adjust the path if necessary
import facebookLogo from './assets/facebook-logo.png'; // Adjust the path if necessary

function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      // Handle successful login, e.g., save the token, redirect user, etc.
      console.log('Login successful:', data);
    } else {
      // Handle login error
      console.error('Login failed:', data);
    }
  };

  return (
    <div className="login-register-container">
      <h1>Login | Register Page</h1>

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
          <img src={facebookLogo} alt="Facebook logo" /> Login with Facebook
        </button>
      </div>
      
      <button className="freelancer-button" onClick={() => window.location.href = '/register'}>
        Register as Freelancer
      </button>
    </div>
  );
}

export default LoginRegister;

