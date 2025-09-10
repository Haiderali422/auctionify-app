import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.background.default,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  position: 'relative',
  '&:after': {
    content: '""',
    display: 'block',
    width: 60,
    height: 4,
    background: theme.palette.error.light,
    margin: '0.5rem auto',
    borderRadius: 2,
  },
}));

const GridWrap = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  alignItems: 'stretch',
}));

const StepCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  textAlign: 'center',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1rem',
  fontWeight: 600,
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
      <Container maxWidth="lg">
        <SectionTitle variant="h4" component="h2" gutterBottom>
          How It Works
        </SectionTitle>

        <GridWrap>
          {steps.map((step) => (
            <StepCard key={step.number} elevation={0}>
              <StepNumber>{step.number}</StepNumber>
              <Typography
                variant="subtitle1"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600, mb: 1 }}
              >
                {step.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.5 }}>
                {step.description}
              </Typography>
            </StepCard>
          ))}
        </GridWrap>
      </Container>
    </Section>
  );
};

export default HowItWorks;
