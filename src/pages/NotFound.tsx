import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center p-5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Back to Home
          </Link>
          <Link 
            to="/contact"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 left-5 w-32 h-32 rounded-full bg-primary opacity-5"></div>
        <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-blue-500 opacity-5"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-green-500 opacity-5"></div>
        <div className="absolute bottom-32 right-1/4 w-28 h-28 rounded-full bg-yellow-500 opacity-5"></div>
      </div>
    </div>
  );
};

export default NotFound; 