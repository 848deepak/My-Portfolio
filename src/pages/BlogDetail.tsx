import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

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

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Scroll to top on page load
        window.scrollTo(0, 0);
        
        setLoading(true);
        setError(null);
        
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data.data);
        
        // Fetch related blogs (same tag)
        if (res.data.data.tags.length > 0) {
          const tag = res.data.data.tags[0];
          const relatedRes = await axios.get(`/api/blogs?tags=${tag}&limit=3&exclude=${id}`);
          setRelatedBlogs(relatedRes.data.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog post. Please try again later.');
        setLoading(false);
        
        // Fallback data if API fails
        const fallbackBlog = {
          _id: 'blog1',
          title: 'Building Nemo: A Bot That Thinks Before It Turns',
          summary: 'How I designed a line-following robot that uses PID control and intelligent path-finding algorithms to navigate complex courses.',
          content: `
            <h2>Introduction</h2>
            <p>During my second year at Chandigarh University, I took on the challenge of building a line-following robot for our college's annual tech fest. What started as a simple project evolved into an exploration of PID control theory and real-time decision making.</p>
            
            <h2>The Challenge</h2>
            <p>The competition required robots to follow a black line on a white background, navigating through various obstacles:</p>
            <ul>
              <li>Sharp turns up to 90 degrees</li>
              <li>Dashed lines with gaps up to 10cm</li>
              <li>Intersections requiring decision making</li>
              <li>Varying line widths from 1.5cm to 3cm</li>
            </ul>
            
            <h2>Hardware Design</h2>
            <p>I built Nemo using an ESP32 microcontroller as the brain, paired with:</p>
            <ul>
              <li>5 infrared sensors for line detection</li>
              <li>Dual H-bridge motor driver</li>
              <li>Custom 3D printed chassis</li>
              <li>18650 Li-ion batteries for power</li>
            </ul>
            
            <h2>The PID Algorithm</h2>
            <p>The key to Nemo's smooth navigation was implementing a PID (Proportional-Integral-Derivative) control algorithm. This allowed the robot to make precise adjustments based on its position relative to the line.</p>
            
            <pre><code>
            // Simplified PID implementation
            error = position - setPoint;
            P = error;
            I = I + error;
            D = error - lastError;
            correction = Kp*P + Ki*I + Kd*D;
            lastError = error;
            
            leftMotorSpeed = baseSpeed + correction;
            rightMotorSpeed = baseSpeed - correction;
            </code></pre>
            
            <h2>Results and Learnings</h2>
            <p>Nemo performed exceptionally well, completing the track in 42 seconds and securing 2nd place in the competition. Through this project, I gained valuable insights into:</p>
            <ul>
              <li>Control theory and feedback systems</li>
              <li>Real-time sensor data processing</li>
              <li>Mechanical design considerations</li>
              <li>Battery management and power optimization</li>
            </ul>
            
            <h2>Future Improvements</h2>
            <p>For my next iteration, I'm planning to add:</p>
            <ul>
              <li>Camera-based line detection using computer vision</li>
              <li>Machine learning for adaptive parameter tuning</li>
              <li>Wireless telemetry for real-time debugging</li>
            </ul>
            
            <p>This project reinforced my passion for robotics and embedded systems, demonstrating how theoretical concepts from the classroom can be applied to create functional and competitive solutions in the real world.</p>
          `,
          tags: ['robotics', 'ESP32', 'PID', 'hardware'],
          imageUrl: '/assets/blog1.jpg',
          published: true,
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-20')
        };
        
        setBlog(fallbackBlog);
        
        const fallbackRelated = [
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
          }
        ];
        
        setRelatedBlogs(fallbackRelated);
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Calculate estimated reading time
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error || 'Blog post not found.'}</p>
        <Link to="/blogs" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <div 
        className="w-full h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${blog.imageUrl || 'https://via.placeholder.com/1920x1080?text=Blog+Hero'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary text-white text-sm rounded-full capitalize">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{getReadingTime(blog.content)} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/blogs" className="flex items-center gap-2 text-primary mb-8 hover:underline">
              <FaArrowLeft /> Back to Blogs
            </Link>

            {/* Content */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Social Share */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-4 flex items-center gap-2">
                    <FaShareAlt /> Share:
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition"
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedBlogs.map(relatedBlog => (
                    <div
                      key={relatedBlog._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="h-40 bg-gray-200 overflow-hidden">
                        <img
                          src={relatedBlog.imageUrl || 'https://via.placeholder.com/600x400?text=Blog+Post'}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">{relatedBlog.title}</h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {relatedBlog.summary}
                        </p>
                        
                        <Link
                          to={`/blogs/${relatedBlog._id}`}
                          className="text-primary hover:underline text-sm flex items-center gap-1"
                        >
                          Read More <FaArrowLeft className="text-xs rotate-180" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 