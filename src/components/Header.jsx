import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Upload', path: '/upload' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sub Header */}
      <div className="sub-header">
        <div className="container">
          <div className="sub-header-content">
            <div className="contact-info">
              <span>📧 majesticmomentsweddingevent01@gmail.com</span>
              <span>📍 Taj Ganj, Agra 282001</span>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="https://x.com/minthu" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>Majestic Moments</h1>
            </Link>

            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact" className="btn btn-primary schedule-btn">
                <Calendar size={16} />
                Schedule Meeting
              </Link>
            </nav>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;