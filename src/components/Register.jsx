import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const payload = {
      username: form.username,
      email: form.email,
      age: form.age,
      password: form.password,
    };

    try {
      await axios.post('http://localhost:5000/api/register', payload);
      alert('Registration successful!');
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Sign Up</h2>

        <label htmlFor="username" className="login-label">Username</label>
        <input
          name="username"
          id="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Choose a username"
          className="login-input"
          required
        />

        <label htmlFor="email" className="login-label">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="login-input"
          required
        />

        <label htmlFor="age" className="login-label">Age</label>
        <input
          name="age"
          id="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Enter your age"
          className="login-input"
          required
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input
          name="password"
          id="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          className="login-input"
          required
        />

        <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
        <input
          name="confirmPassword"
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className="login-input"
          required
        />

        <div style={{ marginTop: '10px', marginBottom: '20px' }}>
          <label>
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            /> Show Password
          </label>
        </div>

        <button onClick={handleRegister} className="register-button">
          Create Account
        </button>

        <p className="login-footer-text">
          Already have an account? <a href="/login" className="login-link">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;