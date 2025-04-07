import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ProjectDetail from '../ProjectDetail';
import { mockProject } from '../../__mocks__/projectMock';

const server = setupServer(
  rest.get('/api/projects/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: mockProject
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderProjectDetail = () => {
  return render(
    <BrowserRouter>
      <ProjectDetail />
    </BrowserRouter>
  );
};

describe('ProjectDetail', () => {
  it('shows loading state initially', () => {
    renderProjectDetail();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays project details after loading', async () => {
    renderProjectDetail();
    
    await waitFor(() => {
      expect(screen.getByText(mockProject.title)).toBeInTheDocument();
      expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    });

    // Check technologies
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });

    // Check links
    expect(screen.getByText('View Live Demo')).toHaveAttribute('href', mockProject.demoUrl);
    expect(screen.getByText('View Source Code')).toHaveAttribute('href', mockProject.githubUrl);
  });

  it('shows error message when project fetch fails', async () => {
    server.use(
      rest.get('/api/projects/:id', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    renderProjectDetail();

    await waitFor(() => {
      expect(screen.getByText('Project not found')).toBeInTheDocument();
      expect(screen.getByText('The project you are looking for does not exist or has been removed.')).toBeInTheDocument();
    });
  });

  it('displays project images correctly', async () => {
    renderProjectDetail();

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(mockProject.images.length);
      
      mockProject.images.forEach((image, index) => {
        expect(images[index]).toHaveAttribute('src', image.url);
        expect(images[index]).toHaveAttribute('alt', image.alt);
      });
    });
  });

  it('shows related projects section', async () => {
    renderProjectDetail();

    await waitFor(() => {
      expect(screen.getByText('Related Projects')).toBeInTheDocument();
      expect(screen.getByText('School Management System')).toBeInTheDocument();
    });
  });
}); 