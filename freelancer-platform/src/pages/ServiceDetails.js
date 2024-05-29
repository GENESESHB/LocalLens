import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';
import { checkUserAuthentication } from '../authUtils';

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    fetchServiceDetails();
    authenticateUser();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}products/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch service details');
      }
      const data = await response.json();
      setService(data);
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };

  const authenticateUser = async () => {
    try {
      const userData = await checkUserAuthentication();
      if (userData) {
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      setIsUserLoggedIn(false);
    }
  };

  return (
    <main className="p-6 bg-gray-100">
      <div className="container mx-auto p-6">
        {service ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover object-center" src={service.image} alt={service.name} />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{service.name}</h1>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-semibold text-gray-900">{service.price} DH</p>
                <p className="text-gray-600">Stock: {service.stock}</p>
              </div>
              <div className="border-t pt-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Service Owner</h2>
                <div className="flex items-center mb-4">
                  <img
                    src={service.user.profile_picture || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-700 mb-1">Name: {service.user.name || 'N/A'}</p>
                    <p className="text-gray-700 mb-1">Country: {service.user.country || 'N/A'}</p>
                    <p className="text-gray-700 mb-1">City: {service.user.city || 'N/A'}</p>
                  </div>
                </div>
                {isUserLoggedIn ? (
                  <div>
                    {showContactInfo ? (
                      <div>
                        <p className="text-gray-700 mb-2">Email: {service.user.email}</p>
                        <p className="text-gray-700 mb-2">Phone: {service.user.phone || 'N/A'}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowContactInfo(true)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      >
                        Reveal Contact Information
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-red-500">Log in to see the owner's contact information</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default ServiceDetails;
