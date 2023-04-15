import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { InitialStylePage } from '../style_pages/initial_style';
import { AuthProvider } from '../contexts/auth-context';
import { ClothingRecommendationsPage } from '../style_pages/clothing_recommendations';

test('renders page', () => {
    render(
        <Router>
            <AuthProvider>
                <ClothingRecommendationsPage/>
            </AuthProvider>
        </Router>
    )
    expect(screen.getByText(/Zoe's Boutique/i))
    expect(screen.getByText(/Here are some keywords that can be inputted into the store's search bar:/i))
})
