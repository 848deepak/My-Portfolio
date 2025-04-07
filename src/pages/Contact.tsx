import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Attempt to submit form data to API
      await axios.post('/api/contact', formData);
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-2 text-center">Get In Touch</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Have a question or want to work together? I'd love to hear from you! Fill out the form below or reach out through my social media channels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-md h-full">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <FaEnvelope className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <a 
                        href="mailto:deepak@example.com" 
                        className="text-gray-600 hover:text-primary transition"
                      >
                        deepak@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <FaPhone className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Phone</h3>
                      <a 
                        href="tel:+919876543210" 
                        className="text-gray-600 hover:text-primary transition"
                      >
                        +91 987 654 3210
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <FaMapMarkerAlt className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Location</h3>
                      <p className="text-gray-600">
                        Chandigarh University, Punjab, India
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                  <div className="flex gap-3">
                    <a 
                      href="https://github.com/deepakpandey-tis" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                    <a 
                      href="https://linkedin.com/in/deepakpandey-tis" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-600 transition"
                    >
                      <FaLinkedinIn className="text-xl" />
                    </a>
                    <a 
                      href="https://twitter.com/deepakpandey_tis" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition"
                    >
                      <FaTwitter className="text-xl" />
                    </a>
                    <a 
                      href="https://instagram.com/deepakpandey_tis" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-3 rounded-full hover:from-purple-500 hover:via-pink-400 hover:to-orange-300 transition"
                    >
                      <FaInstagram className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold mb-6">Send A Message</h2>
                
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 border border-green-200 text-green-800 rounded-md p-4 mb-6"
                  >
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  </motion.div>
                ) : null}
                
                {error ? (
                  <div className="bg-red-100 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter subject"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-1 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.0723629823375!2d76.57108641137058!3d30.76919687459005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffb140bd63e07%3A0x68591e334d17a988!2sChandigarh%20University!5e0!3m2!1sen!2sin!4v1688394359837!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chandigarh University Map"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 