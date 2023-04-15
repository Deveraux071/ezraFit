import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculated from '../camera-pages/calculated';
import { AuthProvider } from '../contexts/auth-context';
import { Register } from '../auth-pages/register';
import { InitialStylePage } from '../style_pages/initial_style';

test('renders Calculated page', () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<Calculated/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/style' element={<InitialStylePage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/We have calculated your measurements!/i)).toBeInTheDocument();
})

test('opens dialog when Continue Shopping is clicked', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<Calculated/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/style' element={<InitialStylePage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Continue Shopping >'))
    await waitFor(() => {screen.getByText(/Here are your measurements!/i)})
    expect(screen.getByText(/Upper Body:/i)).toBeInTheDocument();
})

test('redirects to Create Account when button clicked and user not logged in', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<Calculated/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/style' element={<InitialStylePage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Create Account'))
    await waitFor(() => {screen.getAllByText(/Sign Up/i)})
    expect(screen.getAllByText(/Sign Up/i)).toHaveLength(3)
})
