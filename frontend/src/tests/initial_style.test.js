import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { InitialStylePage } from '../style_pages/initial_style';
import { AuthProvider } from '../contexts/auth-context';

test('renders InitialStylePage with undefined user', async () => {
    render(
        <Router>
            <AuthProvider>
                <InitialStylePage/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/No Recommendations yet!/i))
    fireEvent.click(screen.getByText(/Add Image/i))

    await waitFor(() => screen.getByText("Upload an Image and update your preferences"))
})
