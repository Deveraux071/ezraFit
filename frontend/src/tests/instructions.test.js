import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Instructions } from '../components/instructions';

test('renders Instructions', () => {
    render(
        <Router>
            <Instructions imageType='side'/>
        </Router>
    )
    expect(screen.getByText('Instructions')).toBeInTheDocument()
    expect(screen.getByText(/3. Stand in the silhouette looking towards the left./i)).toBeInTheDocument()  
})

test('renders specific instructions for leg', () => {
    render(
        <Router>
            <Instructions imageType='leg'/>
        </Router>
    )
    expect(screen.getByText('Instructions')).toBeInTheDocument()
    expect(screen.getByText(/Stand in the silhouette showing your full body./i)).toBeInTheDocument()  
})

test('renders specific instructions for check', () => {
    render(
        <Router>
            <Instructions imageType='check'/>
        </Router>
    )
    expect(screen.getByText('Instructions')).toBeInTheDocument()
    expect(screen.getByText(/Hold up the checkboard to your chest./i)).toBeInTheDocument()  
})

test('renders specific instructions for spread', () => {
    render(
        <Router>
            <Instructions imageType='spread'/>
        </Router>
    )
    expect(screen.getByText('Instructions')).toBeInTheDocument()
    expect(screen.getByText(/Stand in the silhouette with your arms spread out./i)).toBeInTheDocument()  
})
