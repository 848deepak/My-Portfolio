import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data.data);
        setFilteredProjects(res.data.data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(res.data.data.map((project: Project) => project.category))
        );
        setCategories(uniqueCategories as string[]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data if API fails
        const fallbackData = [
          {
            _id: 'project1',
            title: 'Nemo – PID Line-Following Robot',
            description: 'A robot that detects and follows line patterns using PID control algorithm. Designed for competitions and educational purposes, featuring auto-shortest-path detection using advanced sensor logic.',
            technologies: ['ESP32', 'FreeRTOS', 'L298N', 'C++'],
            category: 'hardware',
            imageUrl: '/assets/nemo-bot.jpg',
            githubUrl: 'https://github.com/848deepak/nemo-robot',
            featured: true,
            createdAt: new Date('2024-01-10')
          },
          {
            _id: 'project2',
            title: 'School Management System',
            description: 'A comprehensive school management system with features for student records, attendance tracking, grade management, and fee collection. Built with Python and SQLite for local deployment.',
            technologies: ['Python', 'SQLite', 'Tkinter', 'ReportLab'],
            category: 'web',
            imageUrl: '/assets/sms.jpg',
            githubUrl: 'https://github.com/848deepak/school-management',
            featured: true,
            createdAt: new Date('2023-11-15')
          },
          {
            _id: 'project3',
            title: 'Traffic Analysis AI',
            description: 'An AI-driven traffic monitoring system that analyzes traffic flow and optimizes traffic signal timing. Uses computer vision to detect vehicle density and machine learning to predict traffic patterns.',
            technologies: ['Python', 'OpenCV', 'TensorFlow', 'Raspberry Pi'],
            category: 'ai',
            imageUrl: '/assets/traffic-ai.jpg',
            githubUrl: 'https://github.com/848deepak/traffic-analysis',
            featured: true,
            createdAt: new Date('2023-09-05')
          },
          {
            _id: 'project4',
            title: 'CU Coding Portfolio',
            description: 'A simple portfolio website showcasing programming projects and skills. Built with HTML, CSS, and JavaScript for a course assignment at Chandigarh University.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
            category: 'web',
            imageUrl: '/assets/cu-portfolio.jpg',
            githubUrl: 'https://github.com/848deepak/cu-portfolio',
            liveUrl: 'https://848deepak.github.io/cu-portfolio',
            featured: false,
            createdAt: new Date('2023-07-20')
          },
        ];
        
        setProjects(fallbackData);
        setFilteredProjects(fallbackData);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(fallbackData.map(project => project.category))
        );
        setCategories(uniqueCategories as string[]);
        
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects when category or search query changes
  useEffect(() => {
    let filtered = [...projects];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        project => 
          project.title.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery, projects]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-center">My Projects</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Explore my portfolio of projects spanning robotics, web development, AI, and more.
            Each project represents my passion for solving real-world problems through technology.
          </p>

          {/* Filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  All Projects
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-md capitalize ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div
                role="status"
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
              />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-gray-600">
                Try changing your search or filter criteria.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map(project => (
                <motion.div
                  key={project._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  variants={itemVariants}
                >
                  <div className="h-56 bg-gray-200 overflow-hidden">
                    <img
                      src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold">{project.title}</h2>
                      {project.featured && (
                        <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/projects/${project._id}`}
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View Details <FaArrowRight className="text-sm" />
                      </Link>
                      
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-primary transition"
                          >
                            <FaGithub />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-primary transition"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects; 