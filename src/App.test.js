import { render, screen } from '@testing-library/react';
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
  expect(emailInputElement.value).toBe('');
});
