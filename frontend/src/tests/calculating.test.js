import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Calculating from '../camera-pages/calculating';

test('renders Calculating page', () => {
    render(
        <Router>
            <Calculating/>
        </Router>
    )
    expect(screen.getByText(/Please stand by while we calculate your measurements!/i)).toBeInTheDocument();
})

// TODO when ready: test redirect to results page once size calculated