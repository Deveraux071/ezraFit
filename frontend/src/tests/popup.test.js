import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Popup from '../components/popup';

test('renders Popup', () => {
    const onSubmit = jest.fn()
    const onCancel = jest.fn()
    render(
        <Router>
            <Popup buttonText='btn' title='test' submitText='submit' onSubmit={onSubmit} onCancel={onCancel} enableSubmit={false}/>
        </Router>
    )
    expect(screen.getByText(/btn/i)).toBeInTheDocument();
    
})

test('tests whether Popup is clickable', async () => {
    const onSubmit = jest.fn()
    const onCancel = jest.fn()
    render(
        <Router>
            <Popup buttonText='btn' title='test' submitText='submit' onSubmit={onSubmit} onCancel={onCancel} enableSubmit={false}/>
        </Router>
    )
    fireEvent.click(screen.getByText('btn'))
    await waitFor(() => expect(screen.getByText(/test/i)))
    fireEvent.click(screen.getByText(/Cancel/i))
    expect(onCancel).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByText(/Submit/i))
    expect(onSubmit).toHaveBeenCalledTimes(1)
})
