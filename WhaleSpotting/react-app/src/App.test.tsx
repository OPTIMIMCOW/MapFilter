import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './components/Home';

test('renders Home Page', () => {
  render(<App />);
  expect(<Home />).toBeDefined();
});
