import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { AuthProvider } from '../contexts/auth-context';

test('renders Navigation', () => {
    render(
        <Router>
            <AuthProvider>
                <Navigation loggedIn={true}/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/EzraFit/i)).toBeInTheDocument();
    expect(screen.getByText(/Get your fit/i)).toBeInTheDocument();
})

test('renders logged in Navigation options', () => {
    render(
        <Router>
            <AuthProvider>
                <Navigation loggedIn={true}/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/EzraFit/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
})

test('renders logged out Navigation options', () => {
    render(
        <Router>
            <AuthProvider>
                <Navigation loggedIn={false}/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/EzraFit/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
})
