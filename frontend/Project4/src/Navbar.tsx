
import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Project 4</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/login') ? 'active' : ''}`} to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/register') ? 'active' : ''}`} to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
