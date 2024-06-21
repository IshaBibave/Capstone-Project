// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { signUp } from '../api'; // Make sure this path is correct according to your project structure
import '../App.css';

const SignUp = ({ onClose, onSignUp }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await signUp(form);
    //   console.log('Sign Up Success:', response);
    //   onSignUp(response); // Call the onSignUp prop with the response
    //   // Handle success (e.g., redirect to another page or show a success message)
    // } catch (error) {
    //   console.error('Sign Up Error:', error);
    //   // Handle error (e.g., show an error message)
    // }
    onSignUp(form);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
