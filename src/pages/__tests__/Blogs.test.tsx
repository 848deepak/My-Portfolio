import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Blogs from '../Blogs';

const mockBlogs = [
  {
    _id: 'blog-1',
    title: 'Test Blog 1',
    content: 'Test blog content 1',
    excerpt: 'Test blog excerpt 1',
    author: 'Test Author',
    tags: ['React', 'Testing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'blog-2',
    title: 'Test Blog 2',
    content: 'Test blog content 2',
    excerpt: 'Test blog excerpt 2',
    author: 'Test Author',
    tags: ['Node.js', 'API'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const server = setupServer(
  rest.get('/api/blogs', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: mockBlogs
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderBlogs = () => {
  return render(
    <BrowserRouter>
      <Blogs />
    </BrowserRouter>
  );
};

describe('Blogs', () => {
  it('shows loading state initially', () => {
    renderBlogs();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays blogs after loading', async () => {
    renderBlogs();
    
    await waitFor(() => {
      expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
      expect(screen.getByText('Test Blog 2')).toBeInTheDocument();
    });

    // Check excerpts
    expect(screen.getByText('Test blog excerpt 1')).toBeInTheDocument();
    expect(screen.getByText('Test blog excerpt 2')).toBeInTheDocument();
  });

  it('filters blogs by search query', async () => {
    renderBlogs();
    
    await waitFor(() => {
      expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
    });

    await act(async () => {
      const searchInput = screen.getByPlaceholderText(/search blogs/i);
      await userEvent.type(searchInput, 'Blog 1');
    });

    expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Blog 2')).not.toBeInTheDocument();
  });

  it('filters blogs by tags', async () => {
    renderBlogs();
    
    await waitFor(() => {
      expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
    });

    await act(async () => {
      const reactTag = screen.getByRole('button', { name: /react/i });
      await userEvent.click(reactTag);
    });

    expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Blog 2')).not.toBeInTheDocument();
  });

  it('shows error message when blogs fetch fails', async () => {
    server.use(
      rest.get('/api/blogs', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderBlogs();

    await waitFor(() => {
      expect(screen.getByText('Error loading blogs')).toBeInTheDocument();
      expect(screen.getByText('Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows no blogs found message when filters return no results', async () => {
    renderBlogs();
    
    await waitFor(() => {
      expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
    });

    await act(async () => {
      const searchInput = screen.getByPlaceholderText(/search blogs/i);
      await userEvent.type(searchInput, 'NonExistentBlog');
    });

    expect(screen.getByText('No blogs found')).toBeInTheDocument();
    expect(screen.getByText('Try changing your search or filter criteria.')).toBeInTheDocument();
  });
}); 