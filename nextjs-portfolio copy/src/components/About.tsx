'use client';

import { motion } from 'framer-motion';
import { personalInfo, education, skills } from '@/lib/data';
import GridBackgroundDemo from './ui/grid-background-demo';
import { cn } from '@/lib/utils';
import CardDemo from './ui/cards-demo-3';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaSass, FaDocker, FaGithub, FaWordpress, FaJava, FaRobot, FaProjectDiagram, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiTypescript, SiCplusplus, SiGraphql, SiGoland, SiFlutter, SiPhp, SiMaterialdesign, SiMongodb, SiMysql, SiC, SiRaspberrypi, SiArduino, SiVsco, SiEspressif } from 'react-icons/si';
import { RiAtLine } from 'react-icons/ri';

const About = () => {
  const categories = ['frontend', 'backend', 'database', 'tools'] as const;
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend Development';
      case 'backend':
        return 'Backend Development';
      case 'database':
        return 'Database & Storage';
      case 'tools':
        return 'Tools & Platforms';
      default:
        return category;
    }
  };
  return (
    <section
      className={cn(
        "section-padding relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden",
        "bg-white dark:bg-black",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
      )}
    >
      {/* Content container */}
      <div className="container-custom relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get to know me better and understand my journey in the world of technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Who I Am
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                I'm passionate about creating innovative solutions and learning new technologies. 
                My goal is to build applications that make a positive impact on people's lives 
                while continuously improving my skills and knowledge.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing my knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          {/* Education & Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Education */}
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <h4 className="text-xl font-semibold mb-4 text-white">
                Education
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-white">
                    {education.degree}
                  </h5>
                  <p className="text-gray-400">
                    {education.institution}
                  </p>
                  <p className="text-sm text-gray-500">
                    {education.startDate} - {education.endDate || 'Present'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {education.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <h4 className="text-xl font-semibold mb-4 text-white">
                Personal Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="font-medium text-white">
                    {personalInfo.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-medium text-white">
                    {personalInfo.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-medium text-white">
                    Available for opportunities
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience:</span>
                  <span className="font-medium text-white">
                    2+ years
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Skills Section */}
        <div className="mt-20">
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
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'C', icon: <SiC className="text-blue-600 text-4xl" /> },
              { name: 'C++', icon: <SiCplusplus className="text-blue-700 text-4xl" /> },
              { name: 'Java', icon: <FaJava className="text-orange-500 text-4xl" /> },
              { name: 'AI', icon: <FaRobot className="text-purple-400 text-4xl" /> },
              { name: 'ML', icon: <FaProjectDiagram className="text-teal-400 text-4xl" /> },
              { name: 'Raspberry Pi', icon: <SiRaspberrypi className="text-red-600 text-4xl" /> },
              { name: 'Arduino', icon: <SiArduino className="text-teal-500 text-4xl" /> },
              { name: 'Git', icon: <FaGitAlt className="text-orange-600 text-4xl" /> },
              { name: 'GitHub', icon: <FaGithub className="text-white text-4xl" /> },
              { name: 'VS Code', icon: <SiVsco className="text-blue-500 text-4xl" /> },
              { name: 'PHP', icon: <SiPhp className="text-indigo-400 text-4xl" /> },
              { name: 'HTML', icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
              { name: 'CSS', icon: <FaCss3Alt className="text-blue-500 text-4xl" /> },
              { name: 'ESP', icon: <SiEspressif className="text-red-600 text-4xl" /> },
              { name: 'IoT', icon: <RiAtLine className="text-green-400 text-4xl" /> },
            ].map(skill => (
              <div key={skill.name} className="flex flex-col items-center justify-center border border-gray-700 bg-black/60 rounded-lg p-6 shadow-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10 hover:-translate-y-1">
                {skill.icon}
                <span className="mt-3 text-white font-medium text-lg text-center">{skill.name}</span>
              </div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-8 text-white">
              Other <span className="gradient-text">Skills</span> & Interests
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Problem Solving' },
                { name: 'Team Collaboration' },
                { name: 'Agile/Scrum' },
                { name: 'UI/UX Design' },
                { name: 'API Design' },
                { name: 'Performance Optimization' },
                { name: 'Testing' },
                { name: 'DevOps' }
              ].map((skill, index) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + (index * 0.05) }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-6 py-3 bg-black border-2 border-gray-700 rounded-full text-sm font-medium text-gray-200 hover:text-white hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 