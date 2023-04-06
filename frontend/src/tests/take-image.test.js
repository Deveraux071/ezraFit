import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TakeImage } from '../camera-pages/take-image'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

test('renders video stream', () => {
    render(
        <Router>
            <TakeImage/>
        </Router>
    )
    expect(screen.getByTestId('webcam')).toBeInTheDocument();
})

test('renders instructions', () => {
    render(
        <Router>
            <TakeImage/>
        </Router>
    )
    expect(screen.getByText('Instructions')).toBeInTheDocument();
})

test('dropdown item selectable and timer displays', async () => {
    render(
        <Router>
            <TakeImage/>
        </Router>
    )
    const comp = screen.getByTestId('dropdown')

    const button = within(comp).getByRole('button');
    fireEvent.mouseDown(button);
    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    
    const options = within(listbox).getAllByRole('option');
    const optionValues = options.map((li) => li.getAttribute('data-value'));

    expect(optionValues).toEqual(['','3', '5', '8', '10', '15', '20']);
    fireEvent.click(options[3]);
    fireEvent.click(screen.getByText('Start'))
    await waitFor(() => screen.getByTestId('timer'))
    expect(screen.getByTestId('timer')).toBeInTheDocument()
})

test('navigates to /view-image', async () => {
    render(
        <Router>
            <TakeImage/>
        </Router>
    )
    const comp = screen.getByTestId('dropdown')

    const button = within(comp).getByRole('button');
    fireEvent.mouseDown(button);
    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );
    
    const options = within(listbox).getAllByRole('option');
    
    fireEvent.click(options[1]);
    fireEvent.click(screen.getByText('Start'))
    await waitFor(() => screen.getByText('Check View'), {timeout: 4000})
})