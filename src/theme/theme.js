// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A0CA3',
      light: '#7209B7',
      dark: '#2c0880',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4361EE',
      light: '#4895EF',
      dark: '#3A0CA3',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E5383B',
      light: '#F72585',
      dark: '#B91C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFB800',
      light: '#FBBF24',
      dark: '#F59E0B',
      contrastText: '#000000',
    },
    info: {
      main: '#4CC9F0',
      light: '#90E0EF',
      dark: '#00B4D8',
      contrastText: '#000000',
    },
    success: {
      main: '#4CC9F0',
      light: '#90E0EF',
      dark: '#00B4D8',
      contrastText: '#000000',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#3A0CA3',
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      color: '#3A0CA3',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#4361EE',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#4361EE',
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2c0880 0%, #3A0CA3 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #4361EE 0%, #4CC9F0 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)',
          },
        },
        outlinedPrimary: {
          borderColor: '#3A0CA3',
          color: '#3A0CA3',
          '&:hover': {
            backgroundColor: 'rgba(58, 12, 163, 0.04)',
            borderColor: '#2c0880',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#212529',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
