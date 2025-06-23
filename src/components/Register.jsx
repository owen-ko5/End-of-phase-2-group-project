// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API logic here
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="login-box">
        <h2 className="login-title">Sign Up</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          value={form.username}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={form.age}
          onChange={handleChange}
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁'}
          </span>
        </div>

        <label>Confirm Password</label>
        <div className="password-wrapper">
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Re-type password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <span className="toggle-password" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? '🙈' : '👁'}
          </span>
        </div>

        <button onClick={handleSubmit}>Create Account</button>

        <div className="login-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
