import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Change Message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Change Message/i);
  expect(linkElement).toBeInTheDocument();
});
