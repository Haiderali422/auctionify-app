import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A0CA3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4361EE',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E5383B',
    },
    warning: {
      main: '#FFB800',
    },
    success: {
      main: '#4CC9F0',
    },
    accent: {
      main: '#F72585', // not standard in MUI, but we’ll extend it
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
    },
  },
  typography: {
    fontFamily: "'Open Sans', 'Montserrat', sans-serif",
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '0.6rem 1.2rem',
          boxShadow: 'none',
          textTransform: 'none',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#2c0880',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#3048c9',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
  },
});

export default theme;
