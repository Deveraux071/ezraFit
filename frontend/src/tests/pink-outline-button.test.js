import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { PinkOutlineButton } from '../components/pink-outline-button';

test('button renders and is clickable', async ()=> {
    const mock = jest.fn()
    render(
        <Router>
            <PinkOutlineButton text='pink outline' onClick={mock}/>
        </Router>
    )
    fireEvent.click(screen.getByText('pink outline'))
    expect(mock).toHaveBeenCalledTimes(1);
})
