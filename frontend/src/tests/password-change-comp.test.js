import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PasswordChangeComp } from '../account-page-components/password-change-comp';

test('renders Component and is clickable', () => {
    const mock1 = jest.fn()
    render(
        <Router>
            <PasswordChangeComp onClick={mock1}/>
        </Router>
    )
    expect(screen.getByText(/Password:/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText(/Change Password/i))
    expect(mock1).toHaveBeenCalledTimes(1)
})
