import { createTheme } from '@mui/material/styles';
import { lightGreen, grey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            light: lightGreen[200],
            main: lightGreen[800],
            dark: lightGreen[900],
        },
        secondary: {
            light: grey[400],
            main: grey[600],
            dark: grey[900],
        },
    },
});