import React, { useState, useEffect } from 'react';
import { BACKEND_ENDPOINT } from '../constants';

function Home() {
  const [services, setServices] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchServices(BACKEND_ENDPOINT + 'products/');
  }, []);

  const fetchServices = async (url) => {
    try {
      const response = await fetch(url, {});
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(prevServices => initialLoad ? data.results : [...prevServices, ...data.results]);
      setNextPage(data.next);
      setInitialLoad(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Handle error, e.g., display a message to the user
    }
  };

  return (
    <div>
      {/* <header className="p-4 bg-gray-100">
        <h1 className="text-center text text-2xl font-bold">Available Services</h1>
        <SearchBar />
      </header> */}
      <main className="p-6 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
              <a href={`/service/${service.id}`} className="block">
                <img className="h-48 w-full object-cover object-center" src={service.image} alt="Product Image" />
              </a>
              <div className="p-4">
                <a href={`/service/${service.id}`} className="block">
                  <h1 className="mb-2 text-lg font-bold text-gray-900">{service.name}</h1>
                </a>
                <p className="mb-2 text-base text-gray-700">
                  {service.description.length > 100 ? `${service.description.substring(0, 100)}...` : service.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">{service.price} DH</p>
                  <a href={`/service/${service.id}`} className="text-blue-500 hover:underline">Read more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          {nextPage && (
            <button
              onClick={() => fetchServices(nextPage)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Load More
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
