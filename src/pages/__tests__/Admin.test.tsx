import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { AuthProvider } from '../../context/AuthContext';
import AdminDashboard from '../admin/Dashboard';
import AdminProjects from '../admin/Projects';
import AdminBlogs from '../admin/Blogs';

const mockUser = {
  _id: 'user-1',
  name: 'Test Admin',
  email: 'admin@example.com',
  role: 'admin',
  createdAt: new Date().toISOString()
};

const server = setupServer(
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-jwt-token',
        user: mockUser
      })
    );
  }),
  rest.get('/api/auth/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: mockUser
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithAuth = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Admin Authentication', () => {
  it('redirects to login when not authenticated', async () => {
    renderWithAuth(<AdminDashboard />);
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('shows loading state while checking authentication', () => {
    renderWithAuth(<AdminDashboard />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays admin dashboard when authenticated', async () => {
    // Mock successful authentication
    server.use(
      rest.get('/api/auth/me', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: mockUser
          })
        );
      })
    );

    renderWithAuth(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
    });
  });

  it('shows error message when authentication check fails', async () => {
    server.use(
      rest.get('/api/auth/me', (req, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    renderWithAuth(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading dashboard/i)).toBeInTheDocument();
    });
  });
});

describe('Admin Projects Management', () => {
  it('allows creating new project when authenticated', async () => {
    server.use(
      rest.get('/api/auth/me', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: mockUser
          })
        );
      }),
      rest.post('/api/projects', (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({
            data: {
              _id: 'new-project',
              title: 'New Project',
              description: 'New Description'
            }
          })
        );
      })
    );

    renderWithAuth(<AdminProjects />);
    
    await waitFor(() => {
      expect(screen.getByText(/manage projects/i)).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /add new project/i }));
    });

    expect(screen.getByText(/create new project/i)).toBeInTheDocument();
  });

  it('shows validation errors when creating project with invalid data', async () => {
    server.use(
      rest.get('/api/auth/me', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: mockUser
          })
        );
      })
    );

    renderWithAuth(<AdminProjects />);
    
    await waitFor(() => {
      expect(screen.getByText(/manage projects/i)).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /add new project/i }));
      await userEvent.click(screen.getByRole('button', { name: /save/i }));
    });

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  });
});

describe('Admin Blogs Management', () => {
  it('allows creating new blog post when authenticated', async () => {
    server.use(
      rest.get('/api/auth/me', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: mockUser
          })
        );
      }),
      rest.post('/api/blogs', (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({
            data: {
              _id: 'new-blog',
              title: 'New Blog',
              content: 'New Content'
            }
          })
        );
      })
    );

    renderWithAuth(<AdminBlogs />);
    
    await waitFor(() => {
      expect(screen.getByText(/manage blogs/i)).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /add new blog/i }));
    });

    expect(screen.getByText(/create new blog/i)).toBeInTheDocument();
  });

  it('shows validation errors when creating blog with invalid data', async () => {
    server.use(
      rest.get('/api/auth/me', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: mockUser
          })
        );
      })
    );

    renderWithAuth(<AdminBlogs />);
    
    await waitFor(() => {
      expect(screen.getByText(/manage blogs/i)).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /add new blog/i }));
      await userEvent.click(screen.getByRole('button', { name: /save/i }));
    });

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/content is required/i)).toBeInTheDocument();
  });
}); 