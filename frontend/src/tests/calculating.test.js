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
