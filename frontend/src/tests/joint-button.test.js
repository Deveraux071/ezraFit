import { fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { JointButton } from '../components/joint-button';

const mock1 = jest.fn()
const mock2 = jest.fn()
const info = [
    {'text': 'left', 'click': mock1}, 
    {'text': 'right', 'click': mock2}
]

test('renders joint button', () => {
    render(
        <Router>
            <JointButton info={info}/>
        </Router>
    )
    expect(screen.getByText('left')).toBeInTheDocument()
    expect(screen.getByText('right')).toBeInTheDocument()
})

test('tests if buttons are clickable', async () => {
    render(
        <Router>
            <JointButton info={info}/>
        </Router>
    )
    fireEvent.click(screen.getByText('left'))
    expect(mock1).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByText('right'))
    expect(mock2).toHaveBeenCalledTimes(1)
})