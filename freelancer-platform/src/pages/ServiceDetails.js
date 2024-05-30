import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';
import { checkUserAuthentication } from '../authUtils';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import avatar from './assets/avatar.png';

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

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
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        {service ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover object-center" src={service.image} alt={service.name} />
            <div className="p-6 flex flex-col lg:flex-row">
              <div className="lg:w-2/3 pr-6">
                <h1 className="mb-4 text-5xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">{service.name}</h1>
                <ReactMarkdown
                  className="prose max-w-none mb-6"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {service.description}
                </ReactMarkdown>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-semibold text-green-600">{service.price} DH</p>
                  {/* <p className="text-gray-600">Stock: {service.stock}</p> */}
                </div>
              </div>
              <div className="lg:w-1/3 lg:pl-6 lg:border-l border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Owner</h2>
                <div className="flex flex-col sm:flex-row items-center mb-4">
                  <img
                    src={service.user.profile_picture || avatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div className="text-center sm:text-left mt-4 sm:mt-0">
                    <p className="text-gray-700 font-semibold">Name: <span className="font-normal">{service.user.name || 'N/A'}</span></p>
                    <p className="text-gray-700 font-semibold">Country: <span className="font-normal">{service.user.country || 'N/A'}</span></p>
                    <p className="text-gray-700 font-semibold">City: <span className="font-normal">{service.user.city || 'N/A'}</span></p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                {isUserLoggedIn ? (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 mb-2 font-semibold">Email: <span className="font-normal">{service.user.email}</span></p>
                    <p className="text-gray-700 mb-2 font-semibold">Phone: <span className="font-normal">{service.user.phone || 'N/A'}</span></p>
                  </div>
                ) : (
                  <p className="text-red-500 mt-4">Log in to see the owner's contact information</p>
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
