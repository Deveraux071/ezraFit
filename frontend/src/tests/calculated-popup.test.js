import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { CalculatedPopup } from '../components/calculated-popup';

test('renders CalculatedPopup when open = true', () => {
    render(
        <Router>
            <CalculatedPopup open={true} size={{upper: 0, lower: 0}}/>
        </Router>
    )
    expect(screen.getByText(/Here are your measurements!/i)).toBeInTheDocument();
    expect(screen.getByText(/Upper Body: 0/i)).toBeInTheDocument();
})
