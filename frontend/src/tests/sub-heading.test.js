import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubHeading } from '../components/sub-heading';

test('tests whether options are clickable when logged out', async () => {
    render(
        <Router>
            <SubHeading title='Text'/>
        </Router>
    )
    expect(screen.getByText('Text')).toBeInTheDocument()
})