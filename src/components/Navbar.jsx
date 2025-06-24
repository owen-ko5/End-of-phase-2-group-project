import { Link } from 'react-router-dom';
import '../style.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        <span className="material-symbols-outlined">home</span>
        FOURFRAME
      </h1>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;