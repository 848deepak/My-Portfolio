import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from 'react-icons/fa';

// Tech stack icons
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaRobot,
  FaCode,
} from 'react-icons/fa';

const techStack = [
  { name: 'React.js', icon: <FaReact /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'MongoDB', icon: <FaDatabase /> },
  { name: 'Robotics', icon: <FaRobot /> },
  { name: 'ESP32/Arduino', icon: <FaCode /> },
];

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [featuredHackathons, setFeaturedHackathons] = useState<any[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured projects
        const projectRes = await axios.get('/api/projects?featured=true');
        setFeaturedProjects(projectRes.data.data.slice(0, 3));

        // Fetch hackathons
        const hackathonRes = await axios.get('/api/hackathons');
        setFeaturedHackathons(hackathonRes.data.data.slice(0, 2));

        // Fetch blogs
        const blogRes = await axios.get('/api/blogs?published=true');
        setFeaturedBlogs(blogRes.data.data.slice(0, 3));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // If API fails, use sample data for demo
        setFeaturedProjects([
          {
            _id: 'project1',
            title: 'Nemo – PID Line-Following Robot',
            description: 'Auto-shortest-path detection using sensor logic',
            technologies: ['ESP32', 'FreeRTOS', 'L298N'],
            category: 'hardware',
            imageUrl: '/assets/nemo-bot.jpg',
          },
          {
            _id: 'project2',
            title: 'School Management System',
            description: 'Tkinter + SQLite + Report Cards + Fees',
            technologies: ['Python', 'SQLite', 'Tkinter'],
            category: 'web',
            imageUrl: '/assets/sms.jpg',
          },
          {
            _id: 'project3',
            title: 'Traffic Analysis AI',
            description: 'Python, OpenCV, ML – traffic light smart control',
            technologies: ['Python', 'OpenCV', 'TensorFlow'],
            category: 'ai',
            imageUrl: '/assets/traffic-ai.jpg',
          },
        ]);

        setFeaturedHackathons([
          {
            _id: 'hackathon1',
            title: 'IIT Bombay HackTech (Jaipur, 2024)',
            description: 'Round 3 finalist with team, built Nemo bot',
            date: new Date('2024-02-15'),
            location: 'Jaipur',
            outcome: 'Finalist',
            imageUrl: '/assets/hackathon1.jpg',
          },
          {
            _id: 'hackathon2',
            title: 'CU Engineering Day Treasure Hunt',
            description: 'Top 15 finish with Keshav, Anurag, Aayush, and Sahil',
            date: new Date('2023-10-10'),
            location: 'Chandigarh University',
            outcome: 'Top 15',
            imageUrl: '/assets/hackathon2.jpg',
          },
        ]);

        setFeaturedBlogs([
          {
            _id: 'blog1',
            title: 'Building Nemo: A Bot That Thinks Before It Turns',
            summary: 'How I designed a line-following robot that uses PID control',
            tags: ['robotics', 'ESP32', 'PID'],
            createdAt: new Date('2024-01-20'),
            imageUrl: '/assets/blog1.jpg',
          },
          {
            _id: 'blog2',
            title: 'How I Used AI to Solve Traffic Problems',
            summary: 'Applying machine learning to optimize traffic signals',
            tags: ['AI', 'Python', 'OpenCV'],
            createdAt: new Date('2023-11-15'),
            imageUrl: '/assets/blog2.jpg',
          },
          {
            _id: 'blog3',
            title: 'My Workshop Journey: From Learner to Mentor at CU',
            summary: 'The story of my growth as a tech community leader',
            tags: ['Community', 'Learning', 'Teaching'],
            createdAt: new Date('2023-09-05'),
            imageUrl: '/assets/blog3.jpg',
          },
        ]);

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hi, I'm <span className="text-primary">Deepak Pandey</span>
              </h1>
              <h2 className="text-xl md:text-2xl mb-6">
                Tech Explorer | Community Builder | Code. Create. Connect.
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                A passionate CSE student at Chandigarh University, robotics & AI enthusiast.
                I build real-world systems like line-following bots, school CRMs, and smart city prototypes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md flex items-center gap-2 transition"
                >
                  View Projects <FaArrowRight />
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border border-white hover:border-primary hover:text-primary text-white px-6 py-3 rounded-md transition"
                >
                  Get In Touch
                </Link>
              </div>
              <div className="flex mt-8 gap-4">
                <a
                  href="https://github.com/848deepak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary transition"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/in/848deepak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="mailto:deepakpandey911494@gmail.com"
                  className="text-2xl hover:text-primary transition"
                >
                  <FaEnvelope />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                <div className="w-64 h-64 mx-auto rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/profile.jpg"
                    alt="Deepak Pandey"
                    className="w-60 h-60 object-cover rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl text-primary mb-3">{tech.icon}</div>
                <h3 className="font-medium">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link
              to="/projects"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              View all <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={project.imageUrl || 'https://via.placeholder.com/600x400'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      View Details <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hackathons Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Hackathons</h2>
            <Link
              to="/hackathons"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              View all <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredHackathons.map((hackathon, index) => (
                <motion.div
                  key={hackathon._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={hackathon.imageUrl || 'https://via.placeholder.com/300x300'}
                          alt={hackathon.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                      <p className="text-gray-600 mb-3">{hackathon.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="font-medium">
                          {new Date(hackathon.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                        </span>
                        <span>•</span>
                        <span>{hackathon.location}</span>
                        <span>•</span>
                        <span className="text-primary font-medium">{hackathon.outcome}</span>
                      </div>
                      <Link
                        to={`/hackathons/${hackathon._id}`}
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View Details <FaArrowRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Blogs</h2>
            <Link
              to="/blogs"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              Read all <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={blog.imageUrl || 'https://via.placeholder.com/600x400'}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        Read More <FaArrowRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let's Work Together</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            I'm always open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out if you have any questions or want to connect!
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary font-medium px-8 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 