import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculating from '../camera-pages/calculating';
import { AuthProvider } from '../contexts/auth-context';
import { EditAccount } from '../user-pages/edit-account';
import { ViewAccount } from '../user-pages/view-account';

test('renders EditAccount', () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<ViewAccount/>}/>
                    <Route path='/edit' element={<EditAccount/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByText('Change Password')).toBeInTheDocument()
})

test('redirects to Edit Account page on Cancel', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<ViewAccount/>}/>
                    <Route path='/edit' element={<EditAccount/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Edit'))
    await waitFor(() => {screen.getByText('Delete My Account')})
})
