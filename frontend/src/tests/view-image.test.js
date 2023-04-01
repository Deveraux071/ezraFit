import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { ViewImage } from '../camera-pages/view-image';
import { BrowserRouter as Router } from 'react-router-dom';

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