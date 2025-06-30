'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';
import { PinContainer } from "@/components/ui/3d-pin";

const Projects = () => {
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
          {projects.map((project, index) => (
            <div key={project.id} className="relative flex items-center justify-center py-12">
              <PinContainer
                title={project.title}
                href={project.liveUrl || project.githubUrl || undefined}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group w-[320px] min-h-[240px] flex flex-col p-0"
                >
                  {/* Project Image */}
                  <div className="relative h-32 bg-black overflow-hidden border-b border-gray-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            // fallback to initial letter if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="text-4xl font-bold text-gray-700"
                        style={{ display: project.image ? 'none' : 'flex' }}
                      >
                        {project.title.charAt(0)}
                      </div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-2 line-clamp-2 flex-1 text-sm">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-black border border-gray-800 text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-black border border-gray-800 text-gray-300 text-xs rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-2 mt-auto">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1 bg-black border border-gray-800 text-gray-300 rounded-lg hover:bg-gray-900 transition-colors duration-200 text-xs"
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </PinContainer>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/deepakpandey"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 