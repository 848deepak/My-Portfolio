import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Hackathons', path: '/hackathons' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Community', path: '/community' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-wider"
          >
            Deepak<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-primary transition duration-300"
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link 
                  to="/admin/dashboard" 
                  className="bg-primary hover:bg-primary/90 text-white rounded px-4 py-2 transition"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <a 
                  href="https://github.com/848deepak" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl hover:text-primary transition"
                >
                  <FaGithub />
                </a>
                <a 
                  href="https://linkedin.com/in/848deepak" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl hover:text-primary transition"
                >
                  <FaLinkedin />
                </a>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-3 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block hover:text-primary transition px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    className="block bg-primary hover:bg-primary/90 text-white rounded px-4 py-2 transition mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-4 mt-2">
                  <a 
                    href="https://github.com/848deepak" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl hover:text-primary transition"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href="https://linkedin.com/in/848deepak" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl hover:text-primary transition"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 