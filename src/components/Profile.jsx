import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    name: '',
    profile_pic: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        localStorage.setItem('profilePic', res.data.profile_pic || '');
        localStorage.setItem('username', res.data.username || '');
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, profile_pic: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setMessage('');
    setError('');
    try {
      await axios.put(
        'http://localhost:5000/api/profile',
        {
          name: profile.name,
          email: profile.email,
          profile_pic: profile.profile_pic
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      localStorage.setItem('profilePic', profile.profile_pic);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-header">Your Profile</h2>

      {error && <p className="profile-error">{error}</p>}
      {message && <p className="profile-success">{message}</p>}

      <div className="form-group">
        <label>Username</label>
        <input type="text" name="username" value={profile.username} disabled />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={profile.name || ''} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {profile.profile_pic && (
          <img
            src={profile.profile_pic}
            alt="Preview"
            style={{ width: '100px', height: '100px', marginTop: '10px', borderRadius: '8px' }}
          />
        )}
      </div>

      <button onClick={handleSubmit}>Update Profile</button>
    </div>
  );
};

export default Profile;
