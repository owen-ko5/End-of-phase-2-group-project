import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

test('user can type into login form', () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  fireEvent.change(usernameInput, { target: { value: 'owen' } });
  fireEvent.change(passwordInput, { target: { value: 'secret' } });

  expect(usernameInput.value).toBe('owen');
  expect(passwordInput.value).toBe('secret');
});
