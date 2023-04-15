import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Calculating from '../camera-pages/calculating';
import { AuthProvider } from '../contexts/auth-context';

test('renders Calculating page', () => {
    render(
        <Router>
            <AuthProvider>
                <Calculating/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/Please stand by while we calculate your measurements!/i)).toBeInTheDocument();
})

test('renders Calculating page', async () => {
    render(
        <Router>
            <AuthProvider>
                <Calculating/>
            </AuthProvider>
        </Router>
    )
    await new Promise((r) => setTimeout(r, 3000));
    expect(screen.getByText(/Your checkboard was not detected. Please use clearer images and try again./i)).toBeInTheDocument();
})
