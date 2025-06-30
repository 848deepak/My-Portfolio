'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useRef, useState } from 'react';

const SECTION_COLORS: Record<string, string> = {
  hero: 'bg-black',
  about: 'bg-blue-900',
  projects: 'bg-green-900',
  experience: 'bg-purple-900',
  contact: 'bg-gray-900',
};

function ClientWrapper() {
  const [currentSection, setCurrentSection] = useState('hero');
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Pick the section closest to the top
          const topSection = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setCurrentSection(topSection.target.id);
        }
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  // @ts-ignore
  if (typeof window !== 'undefined') window.__footerColor = SECTION_COLORS[currentSection];

  return (
    <>
      <Header currentSection={currentSection} />
      <main className="bg-black min-h-screen pt-16 pb-8">
        <div id="hero" ref={sectionRefs.hero}><Hero /></div>
        <div id="about" ref={sectionRefs.about}><About /></div>
        <div id="projects" ref={sectionRefs.projects}><Projects /></div>
        <div id="experience" ref={sectionRefs.experience} className="min-h-[400px]"><Experience /></div>
        <div id="contact" ref={sectionRefs.contact}><Contact /></div>
      </main>
      <Footer backgroundColor={SECTION_COLORS[currentSection]} />
    </>
  );
}

export default function Home() {
  return <ClientWrapper />;
}
