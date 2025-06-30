'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Instagram, Code } from 'lucide-react';
import { socialLinks, personalInfo } from '@/lib/data';

const Footer = ({ backgroundColor = "bg-black" }: { backgroundColor?: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${backgroundColor} text-white py-8 border-t border-gray-800/30`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            © {currentYear} {personalInfo.name}. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.icon === 'mail' ? '/contact' : social.url}
                {...(social.icon !== 'mail' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-white transition-all duration-300"
              >
                {social.icon === 'github' && <Github size={18} />}
                {social.icon === 'linkedin' && <Linkedin size={18} />}
                {social.icon === 'instagram' && <Instagram size={18} />}
                {social.icon === 'code' && <Code size={18} />}
                {social.icon === 'mail' && <Mail size={18} />}
              </motion.a>
            ))}
          </motion.div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center text-gray-400 text-sm"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
            <span>in India</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 