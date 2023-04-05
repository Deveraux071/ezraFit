import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { PinkFillButton } from '../components/pink-fill-button';

test('button renders and is clickable', async ()=> {
    const mock = jest.fn()
    render(
        <Router>
            <PinkFillButton text='pink button' onClick={mock}/>
        </Router>
    )
    fireEvent.click(screen.getByText('pink button'))
    expect(mock).toHaveBeenCalledTimes(1);
})
