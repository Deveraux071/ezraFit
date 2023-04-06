import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';
import { PasswordChangePopup } from '../components/account-page-components/password-change-popup';
import { AuthProvider } from '../contexts/auth-context';
test('renders popup', () => {
    render(
        <Router>
            <AuthProvider>
                <PasswordChangePopup open={true}/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/Change Password/i)).toBeInTheDocument()
})

test('test if onCancel is clickable', async () => {
    const mock = jest.fn()
    render(
        <Router>
            <AuthProvider>
                <PasswordChangePopup onCancel={mock} open={true}/>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByRole('button', {name: 'Cancel'}))
    expect(mock).toHaveBeenCalledTimes(1);
})