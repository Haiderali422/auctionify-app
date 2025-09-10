import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import featureItem from '../../assets/images/featureItem.PNG';

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)',
  color: 'white',
  borderRadius: '0 0 20px 20px',
  marginBottom: theme.spacing(6),
}));

const HeroContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const HeroText = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    paddingRight: 0,
    marginBottom: theme.spacing(4),
  },
}));

const HeroImage = styled(Box)(() => ({
  flex: 1,
  textAlign: 'center',
  '& img': {
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
}));

const Hero = () => {
  return (
    <HeroSection>
      <Container>
        <HeroContent>
          {/* Left Text Section */}
          <HeroText>
            <Typography
              variant="h1"
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
                '&:hover': { bgcolor: 'primary.dark' },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Explore Live Auctions
            </Button>
          </HeroText>

          {/* Right Image Section */}
          <HeroImage>
            <img src={featureItem} alt="Auction Items" />
          </HeroImage>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
