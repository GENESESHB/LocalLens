// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Login-Register';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import PDetails from './pages/PDetails';
import Products from './pages/Products';
import Experience from './pages/Experience';
import ContactUs from './pages/ContactUs';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Experience" element={<Experience />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/PDetails" element={<PDetails />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/Products" element={<Privacy />} />
          <Route path="/Experience" element={<Experience />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

