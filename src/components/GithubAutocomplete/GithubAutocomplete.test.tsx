import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import GithubAutocomplete from './';
import { STUB_LIST_REPO, STUB_LIST_USER } from './__mocks__/stubs';

// TODO move to __mocks__ folder
global.fetch = jest.fn(() => {
    return Promise.resolve({
        status: 200,
        headers: {},
        json: () => Promise.resolve([]),
    });
}) as jest.Mock;

beforeEach(() => {
    fetch.mockClear();
});

test('renders GithubAutocomplete component', () => {
    render(<GithubAutocomplete label="Test label 1" />);
    expect(screen.getByText(/Test label 1/i)).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('list')).not.toBeVisible();
    expect(screen.getByTestId('loader')).not.toBeVisible();
});

test('handle input events', async () => {
    render(<GithubAutocomplete label="Test label 2" />);
    const inputElement = screen.getByTestId('input');
    fireEvent.input(inputElement, { target: { value: '12' } });
    expect(screen.getByDisplayValue('12') === inputElement).toBe(true);
    expect(screen.getByTestId('list')).not.toBeVisible();
    expect(screen.getByTestId('loader')).not.toBeVisible();
});

test('displays no records found', async () => {
    render(<GithubAutocomplete label="Test label 2" />);
    const inputElement = screen.getByTestId('input');
    fireEvent.input(inputElement, { target: { value: 'test' } });
    expect(screen.getByTestId('list')).toBeVisible();
    expect(screen.getByTestId('loader')).toBeVisible();
    expect(screen.getByTestId('footer')).toBeVisible();
    expect(screen.getByText(/Fetching data.../i)).toBeInTheDocument();

    await waitFor(() => {
        expect(fetch).toBeCalledTimes(2);
        // expect(fetch).toHaveBeenNthCalledWith(
        //     1,
        //     'https://api.github.com/search/repositories?q=test in:public in:name&per_page=50&page=1',
        // );
        // expect(fetch).toHaveBeenNthCalledWith(
        //     2,
        //     'https://api.github.com/search/users?q=test in:login&per_page=50&page=1',
        // );
        expect(screen.getByText(/No records were found/i)).toBeInTheDocument();
    });
});

test('displays API error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('Throw error'));

    render(<GithubAutocomplete label="Test label error" />);
    const inputElement = screen.getByTestId('input');
    fireEvent.input(inputElement, { target: { value: 'test' } });

    await waitFor(() => {
        expect(screen.getByText(/Error: Fetch from API failed/i)).toBeInTheDocument();
    });
});

test('displays API rate limit exceeded', async () => {
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            status: 403,
            headers: { get: () => '0' },
            json: () => Promise.resolve([]),
        }),
    );

    render(<GithubAutocomplete label="Test label error" />);
    const inputElement = screen.getByTestId('input');
    fireEvent.input(inputElement, { target: { value: 'test' } });

    await waitFor(() => {
        expect(screen.getByText(/API rate limit exceeded/i)).toBeInTheDocument();
    });
});

test('displays API items list', async () => {
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            status: 200,
            headers: {},
            json: () => Promise.resolve({ total_count: 3, items: STUB_LIST_REPO }),
        }),
    );
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            status: 200,
            headers: {},
            json: () => Promise.resolve({ total_count: 3, items: STUB_LIST_USER }),
        }),
    );

    render(<GithubAutocomplete label="Test label list" />);
    const inputElement = screen.getByTestId('input');
    fireEvent.input(inputElement, { target: { value: 'test' } });

    await waitFor(() => {
        expect(screen.getByTestId('list')).toBeVisible();
        expect(screen.getByText(/Test item 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Test user 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Shows 6 items out of 6 found/i)).toBeInTheDocument();
    });
});
