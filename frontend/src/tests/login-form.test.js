import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/auth-context';
import LoginForm from '../auth-components/login-form';
import { TakeImage } from '../camera-pages/take-image';

test('renders LoginForm', () => {
    render(
        <Router>
            <AuthProvider>
                <LoginForm/>
            </AuthProvider>
        </Router>
    )
    
    expect(screen.getAllByText(/Log In/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument()
})

test('shows error on empty submission', async () => {
    render(
        <Router>
            <AuthProvider>
                <LoginForm/>
            </AuthProvider>
        </Router>
    )

    fireEvent.click(screen.getByText('Log In'))
    await waitFor(() => screen.getByText(/Incorrect email or password./i))
})

test('redirects to Take Image on button click', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<LoginForm/>}/>
                    <Route path='/take-image' element={<TakeImage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )

    fireEvent.click(screen.getByText('Continue as a guest'))
    await waitFor(() => screen.getByText(/Instructions/i))
})