'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Twitter, Globe, Instagram, Code } from 'lucide-react';
import { personalInfo, socialLinks } from '@/lib/data';
// import AnimatedBackground from './AnimatedBackground';
import TextGenerateEffectDemo from './text-generate-effect-demo';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import { SparklesCore } from './ui/sparkles';
import { TypewriterEffectCycling } from './ui/typewriter-effect';
import Link from 'next/link';
import { useState } from 'react';
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

const subtitlePhrases = [
  "CSE Student",
  "The Founder of Codeunia",
  "Mentor",
  "Community Builder"
];

function TypewriterSubtitle() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);
  const [remove, setRemove] = useState(false);

  const handleComplete = () => {
    if (current < subtitlePhrases.length - 1) {
      setTimeout(() => setCurrent(current + 1), 900);
    } else {
      setTimeout(() => {
        setHide(true); // Start fade out
        setTimeout(() => setRemove(true), 600); // Remove from DOM after fade
      }, 1200); // Wait a bit after last phrase
    }
  };

  if (remove) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hide ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <TypewriterEffectCycling
        key={current}
        text={subtitlePhrases[current]}
        className="text-lg md:text-2xl font-semibold text-neutral-200 text-center w-full mx-auto block"
        cursorClassName="bg-blue-500"
        onComplete={handleComplete}
      />
    </motion.div>
  );
}

const Hero = () => {
  const greetings = ["Hello", "नमस्ते"];
  const [currentGreeting, setCurrentGreeting] = useState(0);

  const handleTypingComplete = () => {
    if (currentGreeting === 0) {
      setTimeout(() => {
        setCurrentGreeting(1);
      }, 2000); // Wait 2 seconds before switching to 'नमस्ते'
    } // Do nothing after 'नमस्ते' is shown
  };

  return (
    <HeroHighlight containerClassName="min-h-screen">
      {/* <AnimatedBackground /> */}
      
      <div className="container-custom relative z-10">
        <div className="text-center">
          {/* Greeting with Typewriter Effect, stays after 'नमस्ते' */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-center w-full"
          >
            <div className="flex justify-center items-center gap-x-2 w-full">
              <TypewriterEffectCycling
                key={currentGreeting}
                text={greetings[currentGreeting]}
                className="text-lg text-gray-400 text-center"
                cursorClassName="bg-gray-400"
                onComplete={handleTypingComplete}
              />
              <span className="text-lg text-gray-400">, I'm</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-0"
          >
            <h1 className="text-4xl md:text-8xl font-extrabold text-white text-center">
              Deepak Pandey
            </h1>
          </motion.div>

          {/* Improved Razor-thin blue line with animated glow */}
          <div className="relative flex flex-col items-center justify-center w-full" style={{height: '32px', marginTop: '-10px'}}>
            {/* Animated blue line with moving glow */}
            <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent relative overflow-visible">
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-3 rounded-full bg-blue-500/60 blur-xl pointer-events-none"
                animate={{ x: ["-50%", "50%", "-50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-2 rounded-full bg-blue-500/30 blur-md" />
            </div>
            {/* Ultra-tight, dense sparkles band with fade at bottom */}
            <div className="relative w-3/4 h-3 flex items-start justify-center overflow-visible -mt-1.5" style={{zIndex:2}}>
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={2500}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              {/* Fade out at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-2 pointer-events-none" style={{background: 'linear-gradient(to bottom, transparent, black 90%)'}} />
            </div>
          </div>

          {/* Modern Subtitle with lowercase u in Codeunia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6"
          >
            <div className="flex justify-center items-center w-full text-center">
              <TypewriterSubtitle />
            </div>
          </motion.div>

          {/* Animated Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            {/* <TextGenerateEffectDemo /> */}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/projects">
              <MovingBorderButton className="bg-blue-600 text-white font-semibold border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 w-48 h-14 text-lg">
                View My Work
              </MovingBorderButton>
            </Link>
            <Link href="/about">
              <MovingBorderButton className="bg-white text-black font-semibold border-gray-300 hover:bg-gray-100 hover:border-blue-400 transition-all duration-200 w-48 h-14 text-lg">
                About
              </MovingBorderButton>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center items-center space-x-6 mb-8"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.icon === 'mail' ? '/contact' : social.url}
                {...(social.icon !== 'mail' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-300 hover:text-blue-400"
              >
                {social.icon === 'github' && <Github size={20} />}
                {social.icon === 'linkedin' && <Linkedin size={20} />}
                {social.icon === 'instagram' && <Instagram size={20} />}
                {social.icon === 'code' && <Code size={20} />}
                {social.icon === 'mail' && <Mail size={20} />}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default Hero; 