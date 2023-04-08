import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('that jest is working', () => {
    expect(true).toBe(true)
})
test('renders challange app', () => {
    render(<App/>)

    const linkElement = screen.getByText(/Makersden challange/i)
    expect(linkElement).toBeInTheDocument()
})
