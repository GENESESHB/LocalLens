// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LoginRegister from './pages/LoginRegister';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import RegisterFreelancer from './pages/RegisterFreelancer';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import PDetails from './pages/PDetails';
import Products from './pages/Products';
import Experience from './pages/Experience';
import ContactUs from './pages/ContactUs';
import Navbar from './components/Navbar';
import ServiceDetails from './pages/ServiceDetails';
import MyServices from './pages/MyServices';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Experience" element={<Experience />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Login" element={<LoginRegister />} />
            <Route path="/AboutUs" element={<ContactUs />} />
            <Route path="/PDetails" element={<PDetails />} />
            <Route path="/Privacy" element={<Privacy />} />
            <Route path="/Products" element={<Privacy />} />
            <Route path="/Experience" element={<Experience />} />
            <Route path="/Register" element={<RegisterFreelancer />} /> 
            <Route path="/Reset" element={<ResetPassword />} /> 
            <Route path="/Reset/:token" element={<ResetPasswordConfirm />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/MyServices" element={<MyServices />} />

          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

