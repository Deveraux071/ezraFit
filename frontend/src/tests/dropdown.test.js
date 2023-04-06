import { render, screen, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { DropDown } from '../components/dropdown';
import { BrowserRouter as Router } from 'react-router-dom';

test('dropdown renders and is clickable', async () => {
    const mock = jest.fn()
    render(
        <Router>
            <DropDown data={[1, 2, 3, 4]} onClick={mock}/>
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

    expect(optionValues).toEqual(['', '1','2', '3', '4']);
    fireEvent.click(options[1]);
    expect(mock).toHaveBeenCalledTimes(1)
})