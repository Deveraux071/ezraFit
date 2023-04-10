import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculated from '../camera-pages/calculated';

test('renders Calculated page', () => {
    render(
        <Router>
            <Calculated/>
        </Router>
    )
    expect(screen.getByText(/We have calculated your measurements!/i)).toBeInTheDocument();
})

test('opens dialog when Continue Shopping is clicked', async () => {
    render(
        <Router>
            <Calculated/>
        </Router>
    )
    fireEvent.click(screen.getByText('Continue Shopping >'))
    await waitFor(() => {screen.getByText(/Here are your measurements!/i)})
    expect(screen.getByText(/Upper Body:/i)).toBeInTheDocument();
})
