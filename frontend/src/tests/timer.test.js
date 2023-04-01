import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Timer } from '../components/timer';

test('renders timer', () => {
    render(
        <Router>
            <Timer time={6}/>
        </Router>
    )
    expect(screen.getByTestId('timer')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
})