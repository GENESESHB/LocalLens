import React, { useState, useEffect } from 'react';
import { BACKEND_ENDPOINT, BACKEND_ENDPOINT_UNSLASHED } from '../constants';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { checkUserAuthentication } from '../authUtils';
import Modal from 'react-modal';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

function MyServices() {
  const [services, setServices] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    image: null,
    heading: '',
    description: '',
    price: '',
  });
  const [selectedTab, setSelectedTab] = useState('write');
  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser();
    fetchServices(BACKEND_ENDPOINT + 'api/users/my-products/');
  }, []);

  const authenticateUser = async () => {
    try {
      const userData = await checkUserAuthentication();
      if (userData) {
        fetchServices(BACKEND_ENDPOINT + 'api/users/my-products/');
      }
    } catch (error) {
      navigate('/Login');
    }
  };

  const fetchServices = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(prevServices => initialLoad ? data : [...prevServices, ...data]);
      setNextPage(data.next);
      setInitialLoad(false);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleProductClick = (id) => () => { navigate(`/service/${id}`); };

  const handleAddService = () => {
    setIsModalOpen(true);
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}products/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        setServices(services.filter(service => service.id !== id));
      } else {
        console.error('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setNewService({
      ...newService,
      image: e.target.files[0]
    });
  };

  const handleDescriptionChange = (value) => {
    setNewService({
      ...newService,
      description: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newService.name);
    formData.append('image', newService.image);
    formData.append('heading', newService.heading);
    formData.append('description', newService.description);
    formData.append('price', newService.price);

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}products/`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const newServiceData = await response.json();
        setServices([newServiceData, ...services]);
        setIsModalOpen(false);
        setNewService({
          name: '',
          image: null,
          heading: '',
          description: '',
          price: '',
        });
      } else {
        console.error('Failed to create new service');
      }
    } catch (error) {
      console.error('Error creating new service:', error);
    }
  };

  return (
    <div>
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Services</h1>
        <button
          onClick={handleAddService}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Service
        </button>
      </header>
      <main className="p-6 h-full">
      {services.length === 0 ? (
          <p className="text-center text-gray-600">Nothing to show</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg relative">
              <a onClick={handleProductClick(service.id)} className="block cursor-pointer">
                <img className="h-48 w-full object-cover object-center" src={BACKEND_ENDPOINT_UNSLASHED + service.image} alt="Product Image" />
              </a>
              <div className="p-4">
                <a onClick={handleProductClick(service.id)} className="block cursor-pointer">
                  <h1 className="mb-2 text-xl font-bold text-gray-900 uppercase">{service.name}</h1>
                </a>
                <p className="mb-2 text-base text-gray-700">
                  {service.heading}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">{service.price} DH</p>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
        <div className="fter:h-px mt-5 flex items-center before:h-px before:flex-1 before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300 after:content-['']">
          {nextPage && (
            <button
              type="button"
              onClick={() => fetchServices(nextPage)}
              className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              View More
            </button>
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add New Service"
        className="modal"
        overlayClassName="modal-overlay"
        style={{
          content: {
            width: '80%', // Set the width to 80% of the parent element
            maxWidth: '800px', // Set the maximum width to 800px
            margin: '0 auto', // Center the modal horizontally
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Heading:</label>
            <input
              type="text"
              name="heading"
              value={newService.heading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <ReactMde
              value={newService.description}
              onChange={handleDescriptionChange}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default MyServices;
