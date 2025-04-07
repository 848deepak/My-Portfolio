import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        const res = await axios.get(`/api/projects/${id}`);
        setProject(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching project:', err);
        
        // Provide fallback data for demonstration
        if (id === 'project1') {
          setProject({
            _id: 'project1',
            title: 'Nemo – PID Line-Following Robot',
            description: 'A robot that detects and follows line patterns using PID control algorithm. Designed for competitions and educational purposes, featuring auto-shortest-path detection using advanced sensor logic.\n\nThe robot uses an array of infrared sensors to detect the line and a PID (Proportional-Integral-Derivative) controller to adjust the motors in real-time, ensuring smooth and accurate tracking. One of the key innovations in this project is the implementation of an algorithm that can detect junctions and make decisions to find the shortest path to the destination.\n\nThis project combines hardware design, embedded programming, and control systems theory. The chassis was designed to be lightweight yet durable, with optimal placement of sensors for accurate line detection even at high speeds.',
            technologies: ['ESP32', 'FreeRTOS', 'L298N', 'C++', 'PID Control', 'Infrared Sensors'],
            category: 'hardware',
            imageUrl: '/assets/nemo-bot.jpg',
            githubUrl: 'https://github.com/848deepak/nemo-robot',
            featured: true,
            createdAt: new Date('2024-01-10')
          });
        } else {
          setError('Project not found');
        }
        
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6 text-red-600">Error</h1>
          <p className="text-xl mb-8">{error || 'Project not found'}</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
          >
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-16">
      <div className="container mx-auto px-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <FaArrowLeft /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Project Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt />
                    <span>
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaTag />
                    <span className="capitalize">{project.category}</span>
                  </div>
                </div>
                
                {project.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
                
                <div className="flex flex-wrap gap-3 mt-6">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-8 flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#24292e] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition"
                    >
                      <FaGithub /> View on GitHub
                    </a>
                  )}
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden shadow-md bg-gray-100">
                  <img
                    src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image'}
                    alt={project.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Content */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">More Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail; 