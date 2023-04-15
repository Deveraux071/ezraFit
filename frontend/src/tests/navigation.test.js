import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { AuthProvider } from '../contexts/auth-context';
import { Login } from '../auth-pages/login';
import { ViewAccount } from '../user-pages/view-account';

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
    expect(screen.getByText(/Account/i)).toBeInTheDocument();
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

test('tests whether options are clickable', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<Navigation loggedIn={true}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/account' element={<ViewAccount/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Account'))
    await waitFor(() =>  screen.getByText('Edit'))
})