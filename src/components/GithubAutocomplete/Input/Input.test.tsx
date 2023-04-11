import React from 'react';
import { render, screen } from '@testing-library/react';
import { GithubAutocompleteInput } from './';

test('renders input sub component', () => {
    render(<GithubAutocompleteInput label="Test label" loading={false} />);
    expect(screen.getByText(/Test label/i)).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).not.toBeVisible();
});

test('renders and show loading spinner', () => {
    render(<GithubAutocompleteInput label="Test label" loading={true} />);
    const loaderElement = screen.getByTestId('loader');

    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toBeVisible();
});
