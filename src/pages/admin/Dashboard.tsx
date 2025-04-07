import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaTrophy, FaBlog, FaEye, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

interface DashboardStats {
  totalProjects: number;
  totalHackathons: number;
  totalBlogs: number;
  totalViews: number;
}

interface Project {
  _id: string;
  title: string;
  updatedAt: Date;
}

interface Hackathon {
  _id: string;
  title: string;
  updatedAt: Date;
}

interface Blog {
  _id: string;
  title: string;
  updatedAt: Date;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalHackathons: 0,
    totalBlogs: 0,
    totalViews: 0,
  });
  
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentHackathons, setRecentHackathons] = useState<Hackathon[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsRes = await axios.get('/api/admin/stats');
        setStats(statsRes.data);
        
        // Fetch recent items
        const projectsRes = await axios.get('/api/projects?limit=5&sort=-updatedAt');
        setRecentProjects(projectsRes.data.data);
        
        const hackathonsRes = await axios.get('/api/hackathons?limit=5&sort=-updatedAt');
        setRecentHackathons(hackathonsRes.data.data);
        
        const blogsRes = await axios.get('/api/blogs?limit=5&sort=-updatedAt');
        setRecentBlogs(blogsRes.data.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        
        // Fallback data
        setStats({
          totalProjects: 12,
          totalHackathons: 8,
          totalBlogs: 15,
          totalViews: 5423,
        });
        
        setRecentProjects([
          { _id: 'p1', title: 'Portfolio Website', updatedAt: new Date('2024-05-25') },
          { _id: 'p2', title: 'AI-powered Traffic Management System', updatedAt: new Date('2024-05-20') },
          { _id: 'p3', title: 'E-commerce Platform', updatedAt: new Date('2024-05-15') },
          { _id: 'p4', title: 'Smart Home Automation', updatedAt: new Date('2024-05-10') },
        ]);
        
        setRecentHackathons([
          { _id: 'h1', title: 'Microsoft Imagine Cup 2024', updatedAt: new Date('2024-05-22') },
          { _id: 'h2', title: 'Smart India Hackathon', updatedAt: new Date('2024-05-18') },
          { _id: 'h3', title: 'HackCU 5.0', updatedAt: new Date('2024-05-12') },
        ]);
        
        setRecentBlogs([
          { _id: 'b1', title: 'Building Nemo: A Bot That Thinks Before It Turns', updatedAt: new Date('2024-05-23') },
          { _id: 'b2', title: 'How I Used AI to Solve Traffic Problems', updatedAt: new Date('2024-05-19') },
          { _id: 'b3', title: 'My Workshop Journey: From Learner to Mentor at CU', updatedAt: new Date('2024-05-14') },
          { _id: 'b4', title: 'Getting Started with ESP32 for IoT Projects', updatedAt: new Date('2024-05-09') },
        ]);
        
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaBriefcase className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-600 uppercase">Projects</h2>
              <p className="text-2xl font-bold">{stats.totalProjects}</p>
            </div>
          </div>
          <Link
            to="/admin/projects"
            className="text-sm text-blue-600 hover:underline mt-4 block"
          >
            Manage Projects →
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FaTrophy className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-600 uppercase">Hackathons</h2>
              <p className="text-2xl font-bold">{stats.totalHackathons}</p>
            </div>
          </div>
          <Link
            to="/admin/hackathons"
            className="text-sm text-green-600 hover:underline mt-4 block"
          >
            Manage Hackathons →
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaBlog className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-600 uppercase">Blogs</h2>
              <p className="text-2xl font-bold">{stats.totalBlogs}</p>
            </div>
          </div>
          <Link
            to="/admin/blogs"
            className="text-sm text-purple-600 hover:underline mt-4 block"
          >
            Manage Blogs →
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaEye className="text-yellow-600 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-600 uppercase">Page Views</h2>
              <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-yellow-600 mt-4 block">
            Last 30 days
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Projects</h2>
            <Link
              to="/admin/projects"
              className="text-sm text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          
          {recentProjects.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No projects found</p>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md"
                >
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaCalendarAlt className="mr-1" size={12} />
                      <span>Updated: {formatDate(project.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/projects/edit/${project._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      to={`/projects/${project._id}`}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                      title="View"
                      target="_blank"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Hackathons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Hackathons</h2>
            <Link
              to="/admin/hackathons"
              className="text-sm text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          
          {recentHackathons.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hackathons found</p>
          ) : (
            <div className="space-y-4">
              {recentHackathons.map((hackathon) => (
                <div
                  key={hackathon._id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md"
                >
                  <div>
                    <h3 className="font-medium">{hackathon.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaCalendarAlt className="mr-1" size={12} />
                      <span>Updated: {formatDate(hackathon.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/hackathons/edit/${hackathon._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      to={`/hackathons/${hackathon._id}`}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                      title="View"
                      target="_blank"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Recent Blogs */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Blog Posts</h2>
            <Link
              to="/admin/blogs"
              className="text-sm text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          
          {recentBlogs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No blog posts found</p>
          ) : (
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md"
                >
                  <div>
                    <h3 className="font-medium">{blog.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaCalendarAlt className="mr-1" size={12} />
                      <span>Updated: {formatDate(blog.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/blogs/edit/${blog._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                      title="View"
                      target="_blank"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 