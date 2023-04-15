import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../auth-pages/login';
import { AuthProvider } from '../contexts/auth-context';

test('renders Login page', () => {
    render(
        <Router>
            <AuthProvider>
                <Login/>
            </AuthProvider>
        </Router>
    )
    
    expect(screen.getAllByText(/Log in/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument()
})

test('test whether link to registration page works', async () => {
    render(
        <Router>
            <AuthProvider>
                <Login/>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText(/Sign up here!/i))
    await waitFor(() => screen.getAllByText(/Sign up/i))
})
