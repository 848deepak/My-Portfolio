export const mockProject = {
  _id: 'test-project-1',
  title: 'Test Project 1',
  description: 'A comprehensive test project description that showcases various features and technologies used in the development process.',
  technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
  category: 'web',
  featured: true,
  demoUrl: 'https://demo.test-project-1.com',
  githubUrl: 'https://github.com/test/project-1',
  images: [
    {
      url: '/images/project1-1.jpg',
      alt: 'Project 1 Screenshot 1'
    },
    {
      url: '/images/project1-2.jpg',
      alt: 'Project 1 Screenshot 2'
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}; 