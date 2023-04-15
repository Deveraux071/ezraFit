import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectPoint } from '../select-points-pages/select-point';
import { expect } from '@jest/globals';

test('renders SelectPoint', () => {
    render(
        <Router>
            <SelectPoint img='test' type='check' dict={{}}/>
        </Router>
    )
    expect(screen.getByText(/Click the left point of the check/i))
})
