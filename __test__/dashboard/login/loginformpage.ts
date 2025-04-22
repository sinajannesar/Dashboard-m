import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ثابت‌ها برای خوانایی و کپسوله‌سازی بهتر
const LABELS = {
  EMAIL: /email address/i,
  PASSWORD: /password/i,
  SIGN_IN_BUTTON: /sign in/i,
  AUTH0_BUTTON: /login for auth0/i,
  ERROR_MESSAGE: /login form erorr/i,
};

class LoginFormPage {
  // متدهای دسترسی به عناصر (Getters)
  static getEmailInput() {
    return screen.getByLabelText(LABELS.EMAIL) as HTMLInputElement;
  }

  static getPasswordInput() {
    return screen.getByLabelText(LABELS.PASSWORD) as HTMLInputElement;
  }

  static getSignInButton() {
    return screen.getByRole('button', { name: LABELS.SIGN_IN_BUTTON });
  }

  static getAuth0Button() {
    return screen.getByRole('button', { name: LABELS.AUTH0_BUTTON });
  }

  static getErrorMessage() {
    return screen.getByText(LABELS.ERROR_MESSAGE);
  }

  // متدهای عملیاتی (Actions)
  static async fillEmail(email: string) {
    const emailInput = this.getEmailInput();
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, email);
    return emailInput;
  }

  static async fillPassword(password: string) {
    const passwordInput = this.getPasswordInput();
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, password);
    return passwordInput;
  }

  static async submitForm() {
    const signInButton = this.getSignInButton();
    await userEvent.click(signInButton);
  }

  static async loginWithAuth0() {
    const auth0Button = this.getAuth0Button();
    await userEvent.click(auth0Button);
  }

  static async waitForErrorMessage() {
    return await screen.findByText(LABELS.ERROR_MESSAGE);
  }
}

export default LoginFormPage;