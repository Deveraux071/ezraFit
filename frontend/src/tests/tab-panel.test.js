import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TabPanel } from '../components/account-page-components/tab-panel';
import { ViewAccount } from '../user-pages/view-account';
import { AuthProvider } from '../contexts/auth-context';

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
            <AuthProvider>
            <Routes>
                <Route index element={<TabPanel/>} />
                <Route path={"/account"} element={<ViewAccount/>} />
            </Routes>
            </AuthProvider>
        </Router>
    )
    const accountLink = screen.getByText('Account')
    expect(accountLink).toBeInTheDocument()
    fireEvent.click(accountLink)
    await waitFor(() => screen.getByText(/Name:/i))
})