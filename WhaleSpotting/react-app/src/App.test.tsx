import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home Page', () => {
    render(<App />);
    const linkElement = screen.getByText(/ASP.NET Core/i);
    expect(linkElement).toBeInTheDocument();
});
