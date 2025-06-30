import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { PinContainer } from '@/components/ui/3d-pin';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick?: () => void;
}

export const ProjectCard = ({ project, index = 0, onClick }: ProjectCardProps) => (
  <div className="relative flex items-center justify-center py-12" onClick={onClick}>
    <PinContainer
      title={project.title}
      href={project.liveUrl || project.githubUrl || undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-black border-2 border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all duration-300 group w-[340px] min-h-[260px] flex flex-col p-0"
      >
        {/* Project Image */}
        <div className="relative h-44 bg-gradient-to-br from-gray-900 to-black overflow-hidden border-b-2 border-gray-800 group-hover:border-blue-500/50">
          <div className="absolute inset-0 flex items-center justify-center">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="text-6xl font-bold text-gray-700/30 bg-gradient-to-br from-gray-700/20 to-gray-900/20 w-full h-full flex items-center justify-center"
              style={{ display: project.image ? 'none' : 'flex' }}
            >
              {project.title.charAt(0)}
            </div>
          </div>
          {project.featured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2 flex-1 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-black border-2 border-gray-800 text-gray-300 text-xs rounded-full group-hover:border-blue-500/30 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-black border-2 border-gray-800 text-gray-300 text-xs rounded-full group-hover:border-blue-500/30 transition-colors duration-200">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Project Links */}
          <div className="flex gap-3 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-gray-800 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200 text-xs font-medium flex-1 justify-center"
                onClick={e => e.stopPropagation()}
              >
                <Github size={14} />
                <span>View Project</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 text-xs font-medium shadow-lg shadow-blue-500/20 flex-1 justify-center"
                onClick={e => e.stopPropagation()}
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
);

export default ProjectCard; 