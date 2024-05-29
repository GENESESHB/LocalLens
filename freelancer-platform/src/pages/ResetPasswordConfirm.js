// src/pages/ResetPasswordConfirm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';

const ResetPasswordConfirm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}auth/password/reset/confirm/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.detail);
        // setMessage('Password has been reset successfully');
      } else {
        if (data.detail) {
            setErrorMessage(data.detail);
          } else if (data.non_field_errors) {
            setErrorMessage(data.non_field_errors.join(', '));
          } else if (data.token) {
            setErrorMessage("Please try to reset your password again.");
          } else {
            setErrorMessage(data.error || data.message || 'Operation failed, Please try again.');
          }
        // setMessage(data.detail || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred, please try again later.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Reset Password</h1>
        {message && <p className="text-center mb-4">{message}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-md font-medium text-gray-700">New Password:</label>
            <input
              type="password"
              placeholder='Please enter your new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-md font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              placeholder='Please confirm your new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Remember your password ?{' '}
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

export default ResetPasswordConfirm;
