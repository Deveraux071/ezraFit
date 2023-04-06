import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { EditButton } from '../components/edit-button';

test('edit button renders and is clickable', async () => {
    const mock = jest.fn()
    render(
        <Router>
            <EditButton onClick={mock}/>
        </Router>
    )
    
    const editBtn = screen.getByText('Edit')
    expect(editBtn).toBeInTheDocument()
    fireEvent.click(editBtn)
    expect(mock).toHaveBeenCalledTimes(1)
})