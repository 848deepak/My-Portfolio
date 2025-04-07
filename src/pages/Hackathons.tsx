import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';

interface Hackathon {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  role: string;
  team?: string[];
  technologies: string[];
  outcome: string;
  imageUrl?: string;
  projectUrl?: string;
  createdAt: Date;
}

const Hackathons: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get('/api/hackathons');
        setHackathons(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
        // Fallback data if API fails
        const fallbackData = [
          {
            _id: 'hackathon1',
            title: 'IIT Bombay HackTech (Jaipur, 2024)',
            description: 'A 48-hour hardware hackathon focused on IoT and robotics solutions. Our team built a line-following robot with PID control and shortest path algorithms.',
            date: new Date('2024-02-15'),
            location: 'Jaipur',
            role: 'Team Leader & Hardware Developer',
            team: ['Deepak Pandey', 'Anurag Kumar', 'Sahil Sharma', 'Keshav Singh'],
            technologies: ['ESP32', 'FreeRTOS', 'PID Control', 'Sensors', 'C++'],
            outcome: 'Round 3 Finalist',
            imageUrl: '/assets/hackathon1.jpg',
            projectUrl: 'https://github.com/848deepak/nemo-robot',
            createdAt: new Date('2024-02-20')
          },
          {
            _id: 'hackathon2',
            title: 'CU Engineering Day Treasure Hunt',
            description: 'A day-long competition where teams solved engineering puzzles and challenges across the university campus. Tasks included coding problems, electronic circuits, and mechanical assemblies.',
            date: new Date('2023-10-10'),
            location: 'Chandigarh University',
            role: 'Problem Solver & Navigator',
            team: ['Deepak Pandey', 'Keshav Singh', 'Anurag Kumar', 'Aayush Gupta', 'Sahil Sharma'],
            technologies: ['Problem Solving', 'Electronics', 'Algorithms', 'Teamwork'],
            outcome: 'Top 15 Finish',
            imageUrl: '/assets/hackathon2.jpg',
            createdAt: new Date('2023-10-15')
          },
          {
            _id: 'hackathon3',
            title: 'Smart City Hackathon 2023',
            description: 'A virtual hackathon focused on developing innovative solutions for smart city infrastructure. Our team created a traffic management system using computer vision and machine learning to optimize traffic flow.',
            date: new Date('2023-07-05'),
            location: 'Online',
            role: 'ML Engineer & Presenter',
            team: ['Deepak Pandey', 'Rahul Verma', 'Priya Singh'],
            technologies: ['Python', 'TensorFlow', 'OpenCV', 'Raspberry Pi'],
            outcome: 'Honorable Mention',
            imageUrl: '/assets/hackathon3.jpg',
            projectUrl: 'https://github.com/848deepak/smart-traffic',
            createdAt: new Date('2023-07-10')
          }
        ];
        
        setHackathons(fallbackData);
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
          <h1 className="text-4xl font-bold mb-2 text-center">Hackathons</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            My journey through various hackathons and coding competitions.
            These events have been instrumental in developing my problem-solving skills, teamwork, and ability to build under pressure.
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div
              className="space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {hackathons.map(hackathon => (
                <motion.div
                  key={hackathon._id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 lg:w-1/4">
                      <div className="rounded-lg overflow-hidden bg-gray-100 h-60 md:h-full">
                        <img
                          src={hackathon.imageUrl || 'https://via.placeholder.com/400x300?text=Hackathon'}
                          alt={hackathon.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 lg:w-3/4">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <h2 className="text-2xl font-bold">{hackathon.title}</h2>
                        <span className="px-4 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {hackathon.outcome}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt />
                          <span>
                            {new Date(hackathon.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          <span>{hackathon.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <FaTrophy />
                          <span>{hackathon.role}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        {hackathon.description}
                      </p>
                      
                      {hackathon.team && (
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Team Members:</h3>
                          <div className="flex flex-wrap gap-2">
                            {hackathon.team.map((member, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2">Technologies Used:</h3>
                        <div className="flex flex-wrap gap-2">
                          {hackathon.technologies.map(tech => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Link
                          to={`/hackathons/${hackathon._id}`}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          View Details <FaArrowRight className="text-sm" />
                        </Link>
                        
                        {hackathon.projectUrl && (
                          <a
                            href={hackathon.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Project
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

export default Hackathons; 