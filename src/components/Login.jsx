import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const Login = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Optional: show loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // clear error when typing
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('username', res.data.username || form.identifier);
      window.location.href = '/'; // ✅ Redirect to homepage after login
    } catch (err) {
      setError('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>

        <label htmlFor="identifier">Username or Email</label>
        <input
          name="identifier"
          id="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Enter your username or email"
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <p className="login-footer">
          New to MovieApp? <a href="/register">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
