import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import './Home.css';

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://your-django-api-url/services/');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Handle error, e.g., display a message to the user
    }
  };

  return (
    <div>
      <header>
        <SearchBar />
      </header>
      <main className="content">
        <h1>Home Page</h1>
        <div className="services-container">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <div className="service-photos">
                {service.photos.map((photo, photoIndex) => (
                  <img key={photoIndex} src={photo.url} alt={`Service ${index + 1} - Photo ${photoIndex + 1}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;

