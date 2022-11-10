import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// test('renders learn react link', () => {
//   // 1) Rendering the component we want to test
//   render(<App />);

//   // 2) Finding the elements
//   const linkElement = screen.getByText(/learn react/i);

//   // 3) Assertion
//   expect(linkElement).toBeInTheDocument();
// });

test('inputs should be initally empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInputElement, 'selena@gmail.com');
  expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type an password', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');

  userEvent.type(passwordInputElement, '123456');
  expect(passwordInputElement.value).toBe('123456');
});
