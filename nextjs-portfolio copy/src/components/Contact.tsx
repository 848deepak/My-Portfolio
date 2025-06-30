'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Code, Send } from 'lucide-react';
import { contactInfo, socialLinks } from '@/lib/data';
import SignupFormDemo from '@/components/ui/signup-form-demo';

const Contact = () => {
  return (
    <section className="section-padding bg-black min-h-screen flex items-center justify-center">
      <div className="container-custom w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and exciting projects. 
            Let's discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center justify-center max-w-4xl mx-auto bg-zinc-900/70 rounded-2xl shadow-xl p-6 md:p-12 relative">
          {/* Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              Let's Connect
            </h3>
            <p className="text-gray-400 mb-8 max-w-xs">
              Feel free to reach out if you'd like to discuss a project, collaboration, or just want to say hello. I'll get back to you as soon as possible.
            </p>
            <h4 className="text-lg font-semibold mb-3 text-white">Follow Me</h4>
            <div className="flex space-x-4 mb-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.icon === 'mail' ? '/contact' : social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-zinc-800 rounded-full shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-200 text-gray-300 hover:text-white text-xl"
                >
                  {social.icon === 'github' && <Github size={22} />}
                  {social.icon === 'linkedin' && <Linkedin size={22} />}
                  {social.icon === 'instagram' && <Instagram size={22} />}
                  {social.icon === 'code' && <Code size={22} />}
                  {social.icon === 'mail' && <Mail size={22} />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" style={{transform: 'translateX(-50%)'}} />

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <SignupFormDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 