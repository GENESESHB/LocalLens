import React, { useState, useEffect } from 'react';
import { BACKEND_ENDPOINT } from '../constants';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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
      <main className="p-6 bg-gray-100 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
              <a onClick={handleProductClick(service.id)} className="bloc cursor-pointer">
                <img className="h-48 w-full object-cover object-center" src={service.image} alt="Product Image" />
              </a>
              <div className="p-4">
                <a onClick={handleProductClick(service.id)} className="block cursor-pointer">
                  <h1 className="mb-2 text-xl font-bold text-gray-900 uppercase">{service.name}</h1>
                </a>
                <p className="mb-2 text-base text-gray-700">
                  { service.heading }
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">{service.price} DH</p>
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
