import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogs?published=true');
        setBlogs(res.data.data);
        setFilteredBlogs(res.data.data);
        
        // Extract unique tags
        const allTags: string[] = [];
        res.data.data.forEach((blog: Blog) => {
          blog.tags.forEach(tag => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        });
        setTags(allTags);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback data if API fails
        const fallbackData = [
          {
            _id: 'blog1',
            title: 'Building Nemo: A Bot That Thinks Before It Turns',
            summary: 'How I designed a line-following robot that uses PID control and intelligent path-finding algorithms to navigate complex courses.',
            content: 'This is a placeholder for the full blog content.',
            tags: ['robotics', 'ESP32', 'PID', 'hardware'],
            imageUrl: '/assets/blog1.jpg',
            published: true,
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-20')
          },
          {
            _id: 'blog2',
            title: 'How I Used AI to Solve Traffic Problems',
            summary: 'Applying machine learning and computer vision to optimize traffic signals and reduce congestion in urban areas.',
            content: 'This is a placeholder for the full blog content.',
            tags: ['AI', 'Python', 'OpenCV', 'machine-learning'],
            imageUrl: '/assets/blog2.jpg',
            published: true,
            createdAt: new Date('2023-11-15'),
            updatedAt: new Date('2023-11-18')
          },
          {
            _id: 'blog3',
            title: 'My Workshop Journey: From Learner to Mentor at CU',
            summary: 'The story of my growth as a tech community leader and how I transitioned from attending workshops to hosting them.',
            content: 'This is a placeholder for the full blog content.',
            tags: ['community', 'learning', 'teaching', 'leadership'],
            imageUrl: '/assets/blog3.jpg',
            published: true,
            createdAt: new Date('2023-09-05'),
            updatedAt: new Date('2023-09-10')
          },
          {
            _id: 'blog4',
            title: 'Getting Started with ESP32 for IoT Projects',
            summary: 'A beginner-friendly guide to working with ESP32 microcontrollers for Internet of Things applications.',
            content: 'This is a placeholder for the full blog content.',
            tags: ['ESP32', 'IoT', 'tutorial', 'hardware'],
            imageUrl: '/assets/blog4.jpg',
            published: true,
            createdAt: new Date('2023-07-12'),
            updatedAt: new Date('2023-07-15')
          }
        ];
        
        setBlogs(fallbackData);
        setFilteredBlogs(fallbackData);
        
        // Extract unique tags
        const allTags: string[] = [];
        fallbackData.forEach(blog => {
          blog.tags.forEach(tag => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        });
        setTags(allTags);
        
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs when tag or search query changes
  useEffect(() => {
    let filtered = [...blogs];
    
    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(blog => blog.tags.includes(selectedTag));
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        blog => 
          blog.title.toLowerCase().includes(query) || 
          blog.summary.toLowerCase().includes(query) ||
          blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredBlogs(filtered);
  }, [selectedTag, searchQuery, blogs]);

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Calculate estimated reading time
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
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
          <h1 className="text-4xl font-bold mb-2 text-center">Blog</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights from my journey as a tech enthusiast and developer.
          </p>

          {/* Filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTagChange('all')}
                  className={`px-4 py-2 rounded-md ${
                    selectedTag === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  All Posts
                </button>
                
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`px-4 py-2 rounded-md capitalize ${
                      selectedTag === tag
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
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

          {/* Blogs Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
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
              {filteredBlogs.map(blog => (
                <motion.div
                  key={blog._id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={blog.imageUrl || 'https://via.placeholder.com/600x400?text=Blog+Post'}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    
                    <p className="text-gray-600 mb-4 flex-grow">
                      {blog.summary}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span>{getReadingTime(blog.content)} min read</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-primary hover:underline flex items-center gap-1 mt-4"
                    >
                      Read More <FaArrowRight className="text-sm" />
                    </Link>
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

export default Blogs; 