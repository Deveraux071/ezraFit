import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { AuthProvider } from '../contexts/auth-context';
import { Login } from '../auth-pages/login';
import { Register } from '../auth-pages/register';

test('tests whether options are clickable when logged out', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<Navigation loggedIn={false}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Log in'))
    await waitFor(() =>  screen.getAllByText('Log In'))
})