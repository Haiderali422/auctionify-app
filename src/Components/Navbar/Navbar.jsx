import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Gavel as GavelIcon,
  Home as HomeIcon,
  Whatshot as LiveIcon,
  Category as CategoryIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';

const AuctionNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, href: '#' },
    { text: 'Live Auctions', icon: <LiveIcon />, href: '#' },
    { text: 'Categories', icon: <CategoryIcon />, href: '#' },
    { text: 'How It Works', icon: <InfoIcon />, href: '#' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
        <GavelIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Auction<span style={{ color: '#F72585' }}>Hub</span>
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component="a" href={item.href} disablePadding>
            <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                px: 3,
                py: 1.5,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
              }}
              startIcon={item.icon}
            >
              {item.text}
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Button
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              px: 3,
              py: 1.5,
              mt: 1,
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
            startIcon={<PersonIcon />}
            onClick={() => navigate('/signup')}
          >
            Sign In
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              px: 3,
              py: 1.5,
              mt: 1,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            startIcon={<PersonAddIcon />}
            onClick={() => navigate('/signup')}
          >
            Register
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Auction<span style={{ color: '#F72585' }}>Hub</span>
            </Typography>

            {!isMobile && (
              <Box sx={{ ml: 4, display: 'flex' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    startIcon={item.icon}
                    sx={{
                      mx: 0.5,
                      fontWeight: 600,
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Button
                  color="inherit"
                  startIcon={<PersonIcon />}
                  sx={{
                    mx: 1,
                    fontWeight: 600,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    mx: 1,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2c0880 0%, #3A0CA3 100%)',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AuctionNavbar;
