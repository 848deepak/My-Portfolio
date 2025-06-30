'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { experience } from '@/lib/data';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { BackgroundBeams } from '@/components/ui/background-beams';

const formatDate = (dateString: string) => {
  if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
const formatRange = (start: string, end?: string) => {
  const startStr = formatDate(start);
  const endStr = end ? formatDate(end) : 'Present';
  return `${startStr} – ${endStr}`;
};

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="experience" className="py-20 bg-black min-h-screen relative overflow-hidden">
      {/* Animated Beams Background */}
      <BackgroundBeams className="pointer-events-none z-0 opacity-60" />
      <div className="container mx-auto px-4 relative z-20" ref={containerRef}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Experience
        </h2>
        <p className="text-center text-xl md:text-2xl text-white/70 font-semibold mb-12">
          A journey of growth, learning, and impact.
        </p>
        <div className="relative max-w-6xl mx-auto" ref={ref}>
          {/* Animated vertical timeline line from shadcn/ui Timeline */}
          <div
            style={{ height: height + 'px' }}
            className="hidden md:block absolute left-1/2 top-0 overflow-hidden w-[2px] z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
          <div className="flex flex-col gap-24 md:gap-32 relative z-10">
            {experience.map((exp, idx) => {
              const isRight = idx % 2 === 0;
              return (
                <div key={exp.id} className="relative w-full flex md:items-center">
                  {/* Card placement: extreme left or right */}
                  <div className={`hidden md:block absolute top-0 ${isRight ? 'right-0' : 'left-0'} w-1/2 h-full`} />
                  <motion.div
                    initial={{ opacity: 0, x: isRight ? 120 : -120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`w-full md:w-1/2 ${isRight ? 'md:ml-auto md:pr-0 md:pl-16' : 'md:mr-auto md:pl-0 md:pr-16'} flex ${isRight ? 'justify-end' : 'justify-start'} md:mt-0 mt-6`}
                    style={{ zIndex: 2 }}
                  >
                    <BackgroundGradient className={`rounded-2xl p-8 md:p-10 w-full max-w-lg ${isRight ? 'border-r-4 border-purple-500' : 'border-l-4 border-blue-500'} bg-zinc-900 border border-zinc-700 shadow-lg transition-all duration-300 group`}>
                      {/* Date label above card */}
                      <div className="text-xs font-semibold text-purple-400 mb-2">
                        {formatRange(exp.startDate, exp.endDate)}
                      </div>
                      {/* Card content */}
                      <div className="flex items-center gap-4 mb-2">
                        {exp.logo && (
                          <span className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: '#222' }}>
                            {typeof exp.logo === 'string' ? <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-contain rounded-full" /> : exp.logo}
                          </span>
                        )}
                        <div>
                          <div className="text-lg font-bold text-white leading-tight">{exp.company}</div>
                          <div className="text-base font-semibold text-blue-300">{exp.title}</div>
                          <div className="text-xs text-gray-400">{exp.location}</div>
                        </div>
                      </div>
                      <ul className="list-disc pl-5 text-sm text-neutral-200 mb-4 space-y-1">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies?.map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded-full border border-blue-700 text-xs text-blue-300 bg-black/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </BackgroundGradient>
                  </motion.div>
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 top-12 -translate-x-1/2 z-20">
                    <span className="block w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg border-4 border-black" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 