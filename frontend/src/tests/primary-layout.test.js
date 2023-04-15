import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { PrimaryLayout } from '../layout-components/primary-layout';
import { AuthProvider } from '../contexts/auth-context';
test('renders PrimaryLayout with all children', () => {
    render(
        <Router>
            <AuthProvider>
                <PrimaryLayout loggedIn={true} showTab={true} activeTab='style'/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/EzraFit/i)).toBeInTheDocument();
    expect(screen.getByText(/Style Recommendations/i)).toBeInTheDocument();
})
