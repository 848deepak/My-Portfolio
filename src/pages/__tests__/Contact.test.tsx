import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Contact from '../Contact';

const server = setupServer(
  rest.post('/api/contact', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Message sent successfully'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Contact Form', () => {
  const renderContact = () => {
    return render(<Contact />);
  };

  const fillForm = async (data: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }) => {
    const { name, email, subject, message } = data;

    if (name) {
      await userEvent.type(screen.getByLabelText(/name/i), name);
    }
    if (email) {
      await userEvent.type(screen.getByLabelText(/email/i), email);
    }
    if (subject) {
      await userEvent.type(screen.getByLabelText(/subject/i), subject);
    }
    if (message) {
      await userEvent.type(screen.getByLabelText(/message/i), message);
    }
  };

  it('renders all form fields', () => {
    renderContact();
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty form submission', async () => {
    renderContact();
    
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    renderContact();
    
    await fillForm({
      name: 'Test User',
      email: 'invalid-email',
      subject: 'Test Subject',
      message: 'Test Message'
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it('shows validation error for short message', async () => {
    renderContact();
    
    await fillForm({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Hi'
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
  });

  it('successfully submits form with valid data', async () => {
    renderContact();
    
    await fillForm({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message that is long enough to pass validation.'
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });

    // Form should be reset
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/subject/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('shows error message when form submission fails', async () => {
    server.use(
      rest.post('/api/contact', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderContact();
    
    await fillForm({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message that is long enough to pass validation.'
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/error sending message/i)).toBeInTheDocument();
      expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while form is submitting', async () => {
    renderContact();
    
    await fillForm({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message that is long enough to pass validation.'
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/sending/i);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent(/send message/i);
    });
  });
}); 