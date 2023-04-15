import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/auth-context';
import RegisterForm from '../auth-components/register-form';
import { Login } from '../auth-pages/login';

test('renders RegisterForm', () => {
    render(
        <Router>
            <AuthProvider>
                <RegisterForm/>
            </AuthProvider>
        </Router>
    )
    
    expect(screen.getAllByText(/Sign Up/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/already have an account?/i)).toBeInTheDocument()
})

test('shows error on empty submission', async () => {
    render(
        <Router>
            <AuthProvider>
                <RegisterForm/>
            </AuthProvider>
        </Router>
    )

    fireEvent.click(screen.getByText('Sign Up'))
    await waitFor(() => screen.getByText(/Failed to create account. Try again./i))
})

test('routes to Login on link click', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<RegisterForm/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Log in here!'))
    await waitFor(() => screen.getAllByText(/Log In/))
})
