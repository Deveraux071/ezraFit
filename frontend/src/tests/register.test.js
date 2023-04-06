import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Register } from '../auth-pages/register';
import { AuthProvider } from '../contexts/auth-context';

test('renders Register page', () => {
    render(
        <Router>
            <AuthProvider>
                <Register/>
            </AuthProvider>
        </Router>
    )
    
    expect(screen.getAllByText(/Sign up/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/already have an account?/i)).toBeInTheDocument()
})

test('test whether link to login page works', async () => {
    render(
        <Router>
            <AuthProvider>
                <Register/>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText(/Login here!/i))
    await waitFor(() => screen.getByText(/Log in/i))
})
