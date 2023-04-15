import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/auth-context';
import LoginForm from '../auth-components/login-form';
import { Register } from '../auth-pages/register';

test('routes to Register on link click', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<LoginForm/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Sign up here!'))
    await waitFor(() => screen.getAllByText(/Sign Up/))
})