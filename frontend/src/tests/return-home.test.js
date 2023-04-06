import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { ReturnToHome } from '../components/return-home';

test('renders Return to Home button', () => {
    render(
        <Router>
            <ReturnToHome/>
        </Router>
    )

    expect(screen.getByText(/Return to Home/i)).toBeInTheDocument()
})

test('tests whether Return to Home is clickable', async () => {
    const mockCallback = jest.fn()
    render(
        <Router>
            <ReturnToHome onClick={mockCallback}/>
        </Router>
    )

    fireEvent.click(screen.getByText(/return to home/i))
    expect(mockCallback).toHaveBeenCalled()
})