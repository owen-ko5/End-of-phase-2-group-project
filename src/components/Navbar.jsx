// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import '../style.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">🎬 Movie App</h1>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
