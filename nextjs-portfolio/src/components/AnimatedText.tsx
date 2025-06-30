'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'typewriter' | 'fade' | 'slide';
}

const AnimatedText = ({ text, className = '', delay = 0, type = 'fade' }: AnimatedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (type === 'typewriter') {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      }
    } else {
      setDisplayText(text);
    }
  }, [currentIndex, text, type]);

  if (type === 'typewriter') {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      </motion.span>
    );
  }

  if (type === 'slide') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedText; 