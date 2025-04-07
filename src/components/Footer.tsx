import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Back to top button */}
      <div className="container mx-auto px-4 relative">
        <button
          onClick={scrollToTop}
          className="absolute -top-5 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-4 block">Deepak Pandey</Link>
            <p className="text-gray-400 mb-4 max-w-md">
              A passionate Computer Science Engineering student specializing in full-stack development,
              machine learning, and IoT. I love building innovative solutions to real-world problems.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/deepakpandey-tis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://twitter.com/deepakpandey_tis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com/in/deepakpandey-tis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://instagram.com/deepakpandey_tis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/hackathons" className="text-gray-400 hover:text-white transition">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-gray-400" />
                <a
                  href="mailto:deepak@example.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  deepak@example.com
                </a>
              </li>
              <li>
                <p className="text-gray-400">
                  Chandigarh University, <br />
                  Punjab, India
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Deepak Pandey. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white text-sm transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 