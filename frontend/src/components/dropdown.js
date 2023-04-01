import * as React from 'react';
import { useState } from 'react';
import { Box, FormControl, Select, MenuItem } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const DropDown = ( { data, width=300, onClick } ) => {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };
    const [value, setValue] = useState([])
    
    const handleChange = (e) => {
        setValue(e.target.value);
        onClick(e.target.value);
    };

    return (
        <Box data-testid='dropdown'>
            <FormControl sx={{ m: 1, width: width}}>
                <Select
                    displayEmpty
                    value={value}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                >   
                    <MenuItem disabled value="" >
                        Select Time
                    </MenuItem>
                    {data.map((d) => (
                        <MenuItem value={d} key={d} data-testid='selection'>
                            {d}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );

}
