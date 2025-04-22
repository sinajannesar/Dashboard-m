import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from '../../../src/components/ui/loginform';
import { signIn } from 'next-auth/react';
import '@testing-library/jest-dom';
import React from 'react';
import LoginFormPage from './loginformpage';

// Constants for testing
const VALID_EMAIL = 'user@test.com';
const VALID_PASSWORD = 'password123';

// Mock signIn and useRouter
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<LoginForm />);
  });

  it('renders the form correctly', () => {
    expect(LoginFormPage.getEmailInput()).toBeInTheDocument();
    expect(LoginFormPage.getPasswordInput()).toBeInTheDocument();
    expect(LoginFormPage.getSignInButton()).toBeInTheDocument();
    expect(LoginFormPage.getAuth0Button()).toBeInTheDocument();
  });

  it('accepts email and password input', async () => {
    const emailInput = await LoginFormPage.fillEmail('test@example.com');
    const passwordInput = await LoginFormPage.fillPassword('12345678');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('12345678');
  });

  it('calls signIn with credentials when form is submitted', async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockResolvedValue({ ok: true, error: null });

    await LoginFormPage.fillEmail(VALID_EMAIL);
    await LoginFormPage.fillPassword(VALID_PASSWORD);
    await LoginFormPage.submitForm();

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });

  it('redirects to dashboard when login succeeds', async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockResolvedValue({ ok: true, error: null });

    await LoginFormPage.fillEmail(VALID_EMAIL);
    await LoginFormPage.fillPassword(VALID_PASSWORD);
    await LoginFormPage.submitForm();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard/home');
    });
  });

  it('displays error message when signIn fails', async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockResolvedValue({ error: 'Invalid credentials' });

    await LoginFormPage.fillEmail(VALID_EMAIL);
    await LoginFormPage.fillPassword(VALID_PASSWORD);
    await LoginFormPage.submitForm();

    await waitFor(() => {
      expect(LoginFormPage.getErrorMessage()).toBeInTheDocument();
    });
  });

  it('calls signIn with Auth0 when Auth0 button is clicked', async () => {
    const mockSignIn = signIn as jest.Mock;

    await LoginFormPage.loginWithAuth0();

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('auth0', {
        redirect: true,
        callbackUrl: '/dashboard/home',
      });
    });
  });
});