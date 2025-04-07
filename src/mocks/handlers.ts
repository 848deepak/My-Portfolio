import { rest } from 'msw';

export const handlers = [
  // Mock projects endpoint
  rest.get('/api/projects', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            _id: 'test-project-1',
            title: 'Test Project 1',
            description: 'Test Description',
            technologies: ['React', 'Node.js'],
            category: 'web',
            featured: true,
            createdAt: new Date().toISOString()
          }
        ]
      })
    );
  }),

  // Mock single project endpoint
  rest.get('/api/projects/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          _id: req.params.id,
          title: 'Test Project',
          description: 'Test Description',
          technologies: ['React', 'Node.js'],
          category: 'web',
          featured: true,
          createdAt: new Date().toISOString()
        }
      })
    );
  }),

  // Add more handlers as needed
]; 