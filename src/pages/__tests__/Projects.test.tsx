import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Projects from '../Projects';

// Wrap component with necessary providers
const renderProjects = () => {
  return render(
    <BrowserRouter>
      <Projects />
    </BrowserRouter>
  );
};

describe('Projects Component', () => {
  it('renders loading state initially', () => {
    renderProjects();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays projects after loading', async () => {
    renderProjects();
    
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('filters projects by category', async () => {
    renderProjects();
    
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });
    
    await act(async () => {
      const webFilter = screen.getByRole('button', { name: /web/i });
      await userEvent.click(webFilter);
    });
    
    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
  });

  it('filters projects by search query', async () => {
    renderProjects();
    
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });
    
    await act(async () => {
      const searchInput = screen.getByPlaceholderText(/search projects/i);
      await userEvent.type(searchInput, 'Test');
    });
    
    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
  });
}); 