import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { ViewImage } from '../camera-pages/view-image';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TakeImage } from '../camera-pages/take-image';

test('test image placeholders on the side and middle', () => {
    render(
        <Router>
            <ViewImage/>
        </Router>
    )
    expect(screen.getByText('Check View')).toBeInTheDocument();
    expect(screen.getByText('Side View')).toBeInTheDocument();
    expect(screen.getByTestId('img-position')).toBeInTheDocument(); 
})

test('test whether retake routes to /take-image', async () => {
    render(
        <Router>
            <Routes>
                <Route index element={<ViewImage/>}/>
                <Route path='/take-image' element={<TakeImage/>}/>
            </Routes>
        </Router>
    )
    const btn = screen.getByText('Retake')
    fireEvent.click(btn)
    await waitFor(() => screen.getByText('Instructions'))
    expect(screen.getByText('Instructions')).toBeInTheDocument()
})
