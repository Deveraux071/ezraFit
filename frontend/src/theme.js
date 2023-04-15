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
            faint_pink: '#fff7fb',
            bg_pink: '#FF9E9E',
            dark_pink: "#f93ea6",
            white: '#ffffff',
            gray: '#AEAEAE',
            dark_gray: '#7B7B7B',
            red: '#FF3737'
        }
    },
    {
        name: 'default',
    }
)
