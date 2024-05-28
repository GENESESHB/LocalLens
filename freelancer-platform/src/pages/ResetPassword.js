import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';

export function ResetPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const response = await fetch(BACKEND_ENDPOINT + 'auth/password/reset/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include', 
    });

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage(data.detail);
    } else {
      if (data.detail) {
        setErrorMessage(data.detail);
      } else if (data.non_field_errors) {
        setErrorMessage(data.non_field_errors.join(', '));
      } else {
        setErrorMessage(data.error || data.message || 'Login failed, Please try again.');
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to LocalLens</h1>
        <p className="text-center mb-6 text-gray-600">Let your travel be a movie</p>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleReset}>
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
          <button type="submit" className="mt-6 w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            {loading ? (
                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                'Reset Password'
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
}

export default ResetPassword;