import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)',
  color: 'white',
  borderRadius: '0 0 20px 20px',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    borderRadius: '0 0 15px 15px',
  },
}));

const HeroContent = styled(Grid)(() => ({
  alignItems: 'center',
  minHeight: '400px',
}));

const HeroImage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '& img': {
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(4),
    },
  },
}));

const Hero = () => {
  return (
    <HeroSection>
      <Container>
        <HeroContent container>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                fontWeight: 600,
                mb: 3,
              }}
            >
              Discover Unique Items & Amazing Deals
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                opacity: 0.9,
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.2rem' },
              }}
            >
              Join the world&apos;s most exciting auction platform. Bid on unique items, rare
              collectibles, and amazing products from around the globe.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Explore Live Auctions
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <HeroImage>
              <img
                src="https://placehold.co/600x400/3A0CA3/FFFFFF/png?text=Featured+Items"
                alt="Auction Items"
              />
            </HeroImage>
          </Grid>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
