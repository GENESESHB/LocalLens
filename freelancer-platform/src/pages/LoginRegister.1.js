// src/components/LoginRegister.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';
import { UserContext } from '../UserContext';

export function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const checkUserConnection = async () => {
      const response = await fetch(BACKEND_ENDPOINT + 'api/users/me/', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/');
      }
    };

    checkUserConnection();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const response = await fetch(BACKEND_ENDPOINT + 'auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', 
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false);
      setUser(data.user);
      navigate('/');
    } else {
      setLoading(false);
      if (data.detail) {
        setErrorMessage(data.detail);
      } else if (data.non_field_errors) {
        setErrorMessage(data.non_field_errors.join(', '));
      } else {
        setErrorMessage(data.error || data.message || 'Login failed, Please try again.');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/Register');
  };
  const handleResetRedirect = () => {
    navigate('/Reset');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3')" }}>
      <div className="relative bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to LocalLens</h1>
        <p className="text-center mb-6 text-gray-600">Let your travel be a movie</p>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin}>
          <div>
            <label className="block text-md font-medium text-gray-700">Email:</label>
            <input
              name='email'
              placeholder='Please enter your email address'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">Password:</label>
            <input
              name='password'
              placeholder='Please enter your password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <button type="submit" className="mt-6 w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            Login
          </button>
          <p className="mt-4 text-gray-600">
          Don't have an account ?{' '}
            <span
              onClick={handleRegisterRedirect}
              className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
            >
              Register Now
            </span>
          </p>

          <p className="text-gray-600">
          Forgot your password ?{' '}
            <span
              onClick={handleResetRedirect}
              className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
            >
              Reset Password
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
