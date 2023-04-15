import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/auth-context';
import { ViewMeasurements } from '../user-pages/view-measurements';
import { TakeImage } from '../camera-pages/take-image';

test('renders ViewMeasurements', () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<ViewMeasurements/>}/>
                    <Route path='/take-image' element={<TakeImage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText('Measurements')).toBeInTheDocument()
    expect(screen.getByText('Take Pictures')).toBeInTheDocument()
})

test('redirects to Take Image page on button click', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<ViewMeasurements/>}/>
                    <Route path='/take-image' element={<TakeImage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Take Pictures'))
    await waitFor(() => {screen.getByText('Instructions')})
})
