import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';
import { TabPanel } from '../src/components/account-page-components/tab-panel';

test('tab panel renders', () => {
    render(
        <Router>
            <TabPanel activeTab='style'/>
        </Router>
    )
    const styleText = screen.getByText('Style Recommendations')
    expect(styleText).toBeInTheDocument()
})

test('tab panel options clickable', async () => {
    render(
        <Router>
            <TabPanel activeTab='style'/>
        </Router>
    )
    const accountLink = screen.getByText('Account')
    expect(accountLink).toBeInTheDocument()
    fireEvent.onClick(accountLink)
    await waitFor(() => screen.getByText('Welcome'))
    await waitFor(() => screen.getByText(/Name:/i))
})