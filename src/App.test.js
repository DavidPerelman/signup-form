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

test('should be able to type a password', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, '123456');
  expect(passwordInputElement.value).toBe('123456');
});

test('should be able to type an confirm password', () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, '123456');
  expect(confirmPasswordInputElement.value).toBe('123456');
});

test('should show email error message on invalid email', () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  expect(emailErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInputElement, 'selenagmail.com');
  userEvent.click(submitBtnElement);
  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
});

test('should show password error if password is less than 5 characters ', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const passwordInputElement = screen.getByLabelText('Password');
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  userEvent.type(emailInputElement, 'selena@gmail.com');
  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, '123');
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show confirm password error if passwords don't match", () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match, Try again/i
  );
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, '12345');

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(confirmPasswordInputElement, '123456');

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords don't match, Try again/i
  );

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test('should show no error message if every input is valid', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, '12345');
  userEvent.type(confirmPasswordInputElement, '12345');

  userEvent.click(submitBtnElement);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );

  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match, Try again/i
  );

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
