import { createTheme } from '@mui/material/styles'

export const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#000000',
            },
            secondary: {
                main: '#F888CB',
            },
            error: {
                main: '#d93025',
            },
            background: {
                default: '#ffffff',
            },
        },
        typography: {
            
        },
        button: {
            variant: 'outlined',
            boxShadow: 3,
            borderRadius: '10px',
            borderColor: '#F888CB'
        },
        colors: {
        }
    },
    {
        name: 'default',
    }
)