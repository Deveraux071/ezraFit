import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/auth-context';
import { EditAccount } from '../user-pages/edit-account';
import { ViewAccount } from '../user-pages/view-account';

test('redirects to Account page on Cancel', async () => {
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
    fireEvent.click(screen.getByText('Cancel'))
    await waitFor(() => {screen.getByText('Edit')})
})
