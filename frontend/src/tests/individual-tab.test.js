import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IndividualTab } from '../account-page-components/individual-tab';

test('renders IndividualTab', () => {
    render(
        <Router>
            <IndividualTab text='tab1'/>
        </Router>
    )
    expect(screen.getByText(/tab1/i)).toBeInTheDocument();
})

test('test whether IndividualTab is clickable', () => {
    const mock1 = jest.fn()
    render(
        <Router>
            <IndividualTab text='tab1' onClick={mock1}/>
        </Router>
    )
    fireEvent.click(screen.getByText(/tab1/i));
    expect(mock1).toHaveBeenCalledTimes(1);
})

