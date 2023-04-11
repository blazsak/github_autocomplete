import React from 'react';
import { render, screen } from '@testing-library/react';
import { GithubAutocompleteList } from './';

test('renders list subcomponent', () => {
    render(
        <GithubAutocompleteList
            isActive={true}
            items={[
                {
                    id: '1',
                    name: 'Test item',
                    avatar: '',
                    description: 'Test desc',
                    url: '',
                    type: 'Test type',
                },
            ]}
        >
            Footer test
        </GithubAutocompleteList>,
    );

    expect(screen.getByText(/Test item/i)).toBeInTheDocument();
    expect(screen.getByText(/Test desc/i)).toBeInTheDocument();
    expect(screen.getByText(/Test type/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer test/i)).toBeInTheDocument();
});
