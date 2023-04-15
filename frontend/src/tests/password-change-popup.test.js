import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { PasswordChangePopup } from '../account-page-components/password-change-popup';
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

test('calls onCancel when empty fields are submitted', async () => {
    const cancel = jest.fn()
    render(
        <Router>
            <AuthProvider>
                <PasswordChangePopup onCancel={cancel} open={true}/>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Save Changes'))
    expect(cancel).toHaveBeenCalledTimes(1)
})