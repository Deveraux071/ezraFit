import { fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { JointButton } from '../components/joint-button';

test('renders joint button', () => {
    render(
        <Router>
            <JointButton text1='left' text2='right'/>
        </Router>
    )
    expect(screen.getByText('left')).toBeInTheDocument()
    expect(screen.getByText('right')).toBeInTheDocument()
})

test('tests if buttons are clickable', async () => {
    const mock1 = jest.fn()
    const mock2 = jest.fn()
    render(
        <Router>
            <JointButton onClick1={mock1} onClick2={mock2} text1='left' text2='right'/>
        </Router>
    )
    fireEvent.click(screen.getByText('left'))
    expect(mock1).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByText('right'))
    expect(mock2).toHaveBeenCalledTimes(1)
})