import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import { ImagePlacer } from  '../components/image-placer';

test('renders ImagePlacer', () => {
    render(
        <Router>
            <ImagePlacer view='Front'/>
        </Router>
    )
    expect(screen.getByText(/Front/i)).toBeInTheDocument();
})
