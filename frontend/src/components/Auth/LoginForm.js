// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginForm.css'; // Ensure the CSS is imported

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setErrors([err.response.data.error.message]);
      } else {
        setErrors(['Login failed. Please try again.']);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Log In</h1>
        <div className="login-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errors.length > 0 && (
          <div className="login-errors">
            {errors.map((error, index) => (
              <p key={index} className="error-text">
                {error}
              </p>
            ))}
          </div>
        )}
        <button className="login-button" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;