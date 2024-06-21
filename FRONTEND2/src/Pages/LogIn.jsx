// src/pages/LogIn.jsx
import React, { useState } from 'react';
import { logIn } from '../api'; // Make sure this path is correct according to your project structure
import '../App.css';

const LogIn = ({ onClose, onLogIn }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogIn(form)
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
