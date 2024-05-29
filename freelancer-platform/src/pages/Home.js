import React, { useState, useEffect } from 'react';
import { BACKEND_ENDPOINT } from '../constants';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [services, setServices] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate(); 

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
    }
  };

  const handleProductClick = (id) => () => { navigate(`/service/${id}`); };
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
                  <button onClick={handleProductClick(service.id)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  View Details
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                  </button>
                  {/* <button className="text-blue-500 hover:underline button">Read more</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fter:h-px mt-5 flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
          
          {nextPage && (
            <button type="button"
                onClick={() => fetchServices(nextPage)}
                class="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mr-1 h-4 w-4">
                    <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                </svg>
                View More
            </button>

          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
