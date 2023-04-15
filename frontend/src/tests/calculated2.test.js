import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculated from '../camera-pages/calculated';
import { AuthProvider } from '../contexts/auth-context';
import { Register } from '../auth-pages/register';
import { InitialStylePage } from '../style_pages/initial_style';

test('redirects to Style on button click', async () => {
    render(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<Calculated/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/style' element={<InitialStylePage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
    fireEvent.click(screen.getByText('Get Style Recommendations'))
    await waitFor(() => {screen.getByText(/No Recommendations yet!/i)})
})
