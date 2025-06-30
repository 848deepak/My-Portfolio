'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';

const Skills = () => {
  // List of technologies/skills to display simply
  const techList = [
    "C", "C++", "Java", "Python", "IoT", "Arduino", "Raspberry Pi", "Linux", "HTML", "CSS", "JavaScript", "React", "Node.js"
  ];

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {techList.map((tech) => (
            <span
              key={tech}
              className="px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-full text-lg font-medium text-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Other Skills & Interests
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Problem Solving', 'Team Collaboration', 'Agile/Scrum', 'UI/UX Design', 'API Design', 'Performance Optimization', 'Testing', 'DevOps'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-black border border-gray-800 rounded-full text-sm font-medium text-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 