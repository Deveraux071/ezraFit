import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/auth-context';
import { EditAccount } from '../user-pages/edit-account';
import { ViewAccount } from '../user-pages/view-account';

test('renders EditAccount', () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<EditAccount/>}/>
                    <Route path='/account' element={<ViewAccount/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText('Save Changes')).toBeInTheDocument()
    expect(screen.getByText('Delete My Account')).toBeInTheDocument()
})

test('redirects to Account page on Save', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<EditAccount/>}/>
                    <Route path='/account' element={<ViewAccount/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Save Changes'))
    await waitFor(() => {screen.getByText('Edit')})
})
