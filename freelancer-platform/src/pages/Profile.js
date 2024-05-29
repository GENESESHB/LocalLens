import React, { useState, useEffect } from 'react';
import { BACKEND_ENDPOINT } from '../constants';
import './Profile.css';

function FreelancerProfile() {
  const [freelancer, setFreelancer] = useState({
    id: 1, // Assuming freelancer ID is 1 for this example
    firstName: '',
    familyName: '',
    phoneNumber: '',
    city: '',
    services: []
  });
  const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(BACKEND_ENDPOINT + "api/users/me/",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
      if (!response.ok) {
        throw new Error('Failed to fetch freelancer data');
      }
      const data = await response.json();
      setFreelancer(data);
    } catch (error) {
      console.error('Error fetching freelancer data:', error);
      // Handle error, e.g., display a message to the user
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFreelancer({
      ...freelancer,
      [name]: value
    });
  };

  const handleServiceInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...freelancer.services];
    updatedServices[index][name] = value;
    setFreelancer({ ...freelancer, services: updatedServices });
  };

  const handleServiceImageChange = (index, e) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
    const updatedServices = [...freelancer.services];
    updatedServices[index][name] = fileArray;
    setFreelancer({ ...freelancer, services: updatedServices });
  };

  const handleAddService = () => {
    setFreelancer({
      ...freelancer,
      services: [...freelancer.services, { stateName: '', stateImages: [], cityName: '', cityImages: [], cultureName: '', cultureImages: [] }]
    });
  };

  const handleDeleteService = (index) => {
    const updatedServices = [...freelancer.services];
    updatedServices.splice(index, 1);
    setFreelancer({ ...freelancer, services: updatedServices });
  };

  const handleSaveProfile = async () => {
    try {
      // Save personal information
      const personalInfoResponse = await fetch(`http://localhost:8000/api/freelancer/${freelancer.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: freelancer.firstName,
          familyName: freelancer.familyName,
          phoneNumber: freelancer.phoneNumber,
          city: freelancer.city,
        }),
      });

      if (!personalInfoResponse.ok) {
        throw new Error('Failed to update personal information.');
      }

      // Save services
      const servicesResponse = await fetch('http://localhost:8000/api/services/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(freelancer.services),
      });

      if (!servicesResponse.ok) {
        throw new Error('Failed to save services.');
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="FP">
      <div className="card-container">
        <div className="card1">
          <h2 onClick={() => setIsPersonalInfoVisible(!isPersonalInfoVisible)}>Personal Information</h2>
          {isPersonalInfoVisible && (
            <div className="personal-info">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={freelancer.firstName}
                onChange={handleInputChange}
              />
              <label>Family Name:</label>
              <input
                type="text"
                name="familyName"
                value={freelancer.familyName}
                onChange={handleInputChange}
              />
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={freelancer.phoneNumber}
                onChange={handleInputChange}
              />
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={freelancer.city}
                onChange={handleInputChange}
              />
              <button onClick={handleSaveProfile}>Save Profile</button>
            </div>
          )}
        </div>

        <div className="card2">
          <h2 onClick={() => setIsServicesVisible(!isServicesVisible)}>Services</h2>
          {isServicesVisible && (
            <div className="services">
              {freelancer.services.map((service, index) => (
                <div key={index} className="service-card">
                  <label>State Name:</label>
                  <input
                    type="text"
                    name="stateName"
                    value={service.stateName}
                    onChange={(e) => handleServiceInputChange(index, e)}
                  />
                  <label>State Images:</label>
                  <input
                    type="file"
                    name="stateImages"
                    multiple
                    onChange={(e) => handleServiceImageChange(index, e)}
                  />
                  <div className="image-preview">
                    {service.stateImages.map((src, i) => (
                      <img key={i} src={src} alt={`State ${i}`} width="100" />
                    ))}
                  </div>

                  <label>City Name:</label>
                  <input
                    type="text"
                    name="cityName"
                    value={service.cityName}
                    onChange={(e) => handleServiceInputChange(index, e)}
                  />
                  <label>City Images:</label>
                  <input
                    type="file"
                    name="cityImages"
                    multiple
                    onChange={(e) => handleServiceImageChange(index, e)}
                  />
                  <div className="image-preview">
                    {service.cityImages.map((src, i) => (
                      <img key={i} src={src} alt={`City ${i}`} width="100" />
                    ))}
                  </div>

                  <label>Culture Name:</label>
                  <input
                    type="text"
                    name="cultureName"
                    value={service.cultureName}
                    onChange={(e) => handleServiceInputChange(index, e)}
                  />
                  <label>Culture Images:</label>
                  <input
                    type="file"
                    name="cultureImages"
                    multiple
                    onChange={(e) => handleServiceImageChange(index, e)}
                  />
                  <div className="image-preview">
                    {service.cultureImages.map((src, i) => (
                      <img key={i} src={src} alt={`Culture ${i}`} width="100" />
                    ))}
                  </div>

                  <button onClick={() => handleDeleteService(index)}>Delete Service</button>
                </div>
              ))}
              <button onClick={handleAddService}>Add Service</button>
              <button onClick={handleSaveProfile}>Save Services</button>
            </div>
          )}
        </div>

        <div className="card3">
          <h2 onClick={() => setIsProfileVisible(!isProfileVisible)}>Profile</h2>
          {isProfileVisible && (
            <div className="profile-info">
              <h3>{freelancer.firstName} {freelancer.familyName}</h3>
              <p>Phone: {freelancer.phoneNumber}</p>
              <p>City: {freelancer.city}</p>
              {freelancer.services.map((service, index) => (
                <div key={index} className="service-profile">
                  <h4>Service {index + 1}</h4>
                  <p>State: {service.stateName}</p>
                  <div className="image-preview">
                    {service.stateImages.map((src, i) => (
                      <img key={i} src={src} alt={`State ${i}`} width="100" />
                    ))}
                  </div>
                  <p>City: {service.cityName}</p>
                  <div className="image-preview">
                    {service.cityImages.map((src, i) => (
                      <img key={i} src={src} alt={`City ${i}`} width="100" />
                    ))}
                  </div>
                  <p>Culture: {service.cultureName}</p>
                  <div className="image-preview">
                    {service.cultureImages.map((src, i) => (
                      <img key={i} src={src} alt={`Culture ${i}`} width="100" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfile;

