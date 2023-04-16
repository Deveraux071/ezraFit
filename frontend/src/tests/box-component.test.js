import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { ContentBox } from '../components/box-component'

test('tests whether ContentBox renders', async () => {
    const pref = [['one', 1], ['two', 2]]
    render(
        <Router>
            <ContentBox preferences={pref}/>
        </Router>
    )
    expect(screen.getByText('one')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('two')).toBeInTheDocument()
})
