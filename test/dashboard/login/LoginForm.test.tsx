import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginForm from "../../../src/components/ui/loginform";
import * as nextAuth from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock next-auth
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('LoginForm Component', () => {
  let push: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock useRouter
    push = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push } as any);
  });

  it('renders the login form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login for auth0/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
  });

  it('allows users to input email and password', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('shows error message when signIn fails', async () => {
    // Mock signIn to return an error
    vi.mocked(nextAuth.signIn).mockResolvedValue({ error: 'Invalid credentials', ok: false, status: 401, url: null });

    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('login form erorr')).toBeInTheDocument();
    });
    expect(nextAuth.signIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('redirects to dashboard on successful login', async () => {
    // Mock signIn to return success
    vi.mocked(nextAuth.signIn).mockResolvedValue({ error: null, ok: true, status: 200, url: null });

    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/dashboard/home');
    });
  });

  it('displays loading state during submission', async () => {
    // Mock signIn to delay response
    vi.mocked(nextAuth.signIn).mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ error: null, ok: true, status: 200, url: null }), 100)));

    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles Auth0 login correctly', async () => {
    // Mock signIn for Auth0
    vi.mocked(nextAuth.signIn).mockResolvedValue({ error: null, ok: true, status: 200, url: null });

    render(<LoginForm />);
    
    const auth0Button = screen.getByRole('button', { name: /login for auth0/i });
    fireEvent.click(auth0Button);

    await waitFor(() => {
      expect(nextAuth.signIn).toHaveBeenCalledWith('auth0', {
        redirect: true,
        callbackUrl: '/dashboard/home',
      });
    });
  });

  it('shows error message on Auth0 login failure', async () => {
    // Mock signIn to throw an error for Auth0
    vi.mocked(nextAuth.signIn).mockRejectedValue(new Error('Auth0 error'));

    render(<LoginForm />);
    
    const auth0Button = screen.getByRole('button', { name: /login for auth0/i });
    fireEvent.click(auth0Button);

    await waitFor(() => {
      expect(screen.getByText('Failed to login with Auth0')).toBeInTheDocument();
    });
  });
});