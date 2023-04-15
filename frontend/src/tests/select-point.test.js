import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SelectPoint } from '../select-points-pages/select-point';
import { AuthProvider } from '../contexts/auth-context';
import Calculating from '../camera-pages/calculating';

test('renders SelectPoint', async () => {
    render(
        <Router>
            <SelectPoint img='test' type='check' dict={{}}/>
        </Router>
    )
    expect(screen.getByText(/Click the left point of the check/i))
    fireEvent.click(screen.getByTestId('img'))
    await waitFor(() => screen.getByText(/Click the right point of the check/i))
})

test('redirects to Calculating when done', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<SelectPoint img='leg' type='leg' dict={{}}/>}/>
                    <Route path='/calculating' element={<Calculating/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/Click the left point of the ankle/i))
    fireEvent.click(screen.getByTestId('img'))
    await waitFor(() => screen.getByText(/Click the right point of the ankle/i))
    fireEvent.click(screen.getByTestId('img'))
    await waitFor(() => screen.getByText(/Please stand by while we calculate your measurements!/i))
})
