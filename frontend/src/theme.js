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
            fontFamily: "'Montserrat', sans-serif",
        },
        button: {
            variant: 'outlined',
            borderRadius: '10px',
            borderColor: '#F888CB'
        },
        colors: {
            pink: '#F888CB',
            white: '#ffffff',
            gray: '#AEAEAE'
        }
    },
    {
        name: 'default',
    }
)
