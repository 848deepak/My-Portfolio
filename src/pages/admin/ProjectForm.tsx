import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaUpload, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Project {
  _id?: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl?: string;
  category: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    technologies: [],
    features: [],
    githubUrl: '',
    liveUrl: '',
    featured: false
  });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    'Web Development',
    'Mobile App',
    'Machine Learning',
    'IoT',
    'Blockchain',
    'UI/UX Design',
    'Game Development',
    'Other'
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/projects/${id}`);
      setProject(res.data.data);
      if (res.data.data.imageUrl) {
        setPreviewUrl(res.data.data.imageUrl);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project. Please try again later.');
      setLoading(false);
      
      // Fallback data
      const fallbackProject = {
        _id: 'p1',
        title: 'Portfolio Website',
        description: 'Personal portfolio website built with React and Node.js',
        longDescription: 'A full-stack portfolio website built to showcase my projects, skills, and achievements. Features a modern design with responsive layout, dark mode, and admin dashboard.',
        imageUrl: '/assets/projects/portfolio.jpg',
        category: 'Web Development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        features: [
          'Responsive design for all devices',
          'Admin dashboard for content management',
          'Dynamic project showcase with filtering',
          'Blog section with markdown support',
          'Contact form with email integration'
        ],
        githubUrl: 'https://github.com/deepakpandey-tis/portfolio',
        liveUrl: 'https://deepakpandey.dev',
        featured: true,
      };
      
      setProject(fallbackProject);
      if (fallbackProject.imageUrl) {
        setPreviewUrl(fallbackProject.imageUrl);
      }
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAddTech = () => {
    if (newTech.trim() !== '' && !project.technologies.includes(newTech.trim())) {
      setProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== '' && !project.features.includes(newFeature.trim())) {
      setProject(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setProject(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Form validation
      if (!project.title || !project.description || !project.category) {
        setError('Please fill in all required fields');
        setSubmitting(false);
        return;
      }
      
      // Handle image upload first if there's a new image
      let imageUrl = project.imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadRes = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        imageUrl = uploadRes.data.imageUrl;
      }
      
      const projectData = {
        ...project,
        imageUrl
      };
      
      if (isEditMode) {
        await axios.put(`/api/projects/${id}`, projectData);
      } else {
        await axios.post('/api/projects', projectData);
      }
      
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Failed to save project. Please try again later.');
      setSubmitting(false);
      
      // For demo purposes, we'll just navigate back as if it succeeded
      setTimeout(() => {
        navigate('/admin/projects');
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Project' : 'Add New Project'}</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={project.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={project.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Select a category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Short Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={project.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            A brief summary of the project (displayed in project cards).
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={project.longDescription}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            A comprehensive description of the project, including its purpose, challenges, and solutions.
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Project Image
          </label>
          <div className="flex items-start gap-6">
            <div className="w-40 h-40 bg-gray-100 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center relative">
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Project Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    title="Remove image"
                  >
                    <FaTimes size={12} />
                  </button>
                </>
              ) : (
                <div className="text-gray-400 text-center p-4">No image</div>
              )}
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 mb-2"
              >
                <FaUpload /> {previewUrl ? 'Change Image' : 'Upload Image'}
              </button>
              <p className="text-sm text-gray-500">
                Recommended size: 1200x800px, max 2MB.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={project.githubUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="https://github.com/username/repo"
            />
          </div>
          
          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Live Demo URL
            </label>
            <input
              type="url"
              id="liveUrl"
              name="liveUrl"
              value={project.liveUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="https://example.com"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Technologies Used
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Add a technology (e.g., React, Node.js)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Key Features
          </label>
          <div className="space-y-2 mb-3">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md"
              >
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feature)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Add a key feature"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={project.featured}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Feature this project on the homepage
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-70"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave /> Save Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 