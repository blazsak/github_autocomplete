import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('that jest is working', () => {
    expect(true).toBe(true);
});
test('renders autocomplete component', () => {
    render(<App />);

    const linkElement = screen.getByText(/Search GitHub repositories/i);
    expect(linkElement).toBeInTheDocument();
});
