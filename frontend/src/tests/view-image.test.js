import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { ViewImage } from '../camera-pages/view-image';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => cleanup())

// test if image on the side and front
test('test image placeholders on the side and middle', () => {
    render(
        <Router>
            <ViewImage/>
        </Router>
    )
    expect(screen.getByText('Front View')).toBeInTheDocument();
    expect(screen.getByText('Side View')).toBeInTheDocument();
    expect(screen.getByTestId('img-position')).toBeInTheDocument(); 
})

/*test('test if retake goes back to /take-image', async () => {
    render(
        <Router>
            <ViewImage/>
        </Router>
    )
    const user = userEvent.setup()
    expect(screen.getByText('Retake')).toBeInTheDocument()
    await user.click(screen.getByText(/retake/i))
    expect(screen.getByText('Instructions')).toBeInTheDocument()
})

test('test if page navigates to /take-image after first image', async () => {
    render(
        <Router>
            <ViewImage imageNum={1} imageType='front' next='side'/>
        </Router>
    )
    expect(screen.getByTestId('next-btn')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('next-btn'))
    await waitFor(() => screen.getByTestId('webcam'), {timeout: 4000})
    screen.debug(undefined, 100000)
})*/
