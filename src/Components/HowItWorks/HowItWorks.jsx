import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.default,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  position: 'relative',
  '&:after': {
    content: '""',
    display: 'block',
    width: '60px',
    height: '4px',
    background: theme.palette.background.paper,
    margin: '0.5rem auto',
    borderRadius: '2px',
  },
}));

const StepCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: '50px',
  height: '50px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.5rem',
  fontWeight: 600,
  fontSize: '1.2rem',
}));

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Register',
      description: 'Create your free account with basic information and verification.',
    },
    {
      number: 2,
      title: 'Browse & Bid',
      description: 'Explore thousands of items and place your bids on interesting products.',
    },
    {
      number: 3,
      title: 'Win & Pay',
      description: 'If you win, securely complete your payment through our protected system.',
    },
    {
      number: 4,
      title: 'Receive Items',
      description: 'Get your items delivered safely to your doorstep with tracking.',
    },
  ];

  return (
    <Section>
      <Container>
        <SectionTitle variant="h2" component="h2">
          How It Works
        </SectionTitle>

        <Grid container spacing={4}>
          {steps.map((step) => (
            <Grid item xs={12} sm={6} md={3} key={step.number}>
              <StepCard elevation={0}>
                <StepNumber>{step.number}</StepNumber>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {step.description}
                </Typography>
              </StepCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default HowItWorks;
