import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: 'white',
  padding: theme.spacing(8, 0, 3),
  marginTop: theme.spacing(8),
}));

const FooterContent = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FooterColumn = styled(Box)(({ theme }) => ({
  '& h3': {
    color: 'white',
    marginBottom: theme.spacing(2),
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  '& p': {
    color: '#ccc',
    lineHeight: 1.6,
  },
}));

const FooterList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& li': {
    marginBottom: theme.spacing(1),
  },
  '& a': {
    color: '#ccc',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: 'white',
    },
  },
}));

const Copyright = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(3),
  borderTop: '1px solid #444',
  color: '#ccc',
  fontSize: '0.9rem',
}));

const Footer = () => {
  const footerLinks = {
    company: [
      { text: 'About Us', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Press', href: '#' },
      { text: 'Blog', href: '#' },
    ],
    quickLinks: [
      { text: 'Live Auctions', href: '#' },
      { text: 'Upcoming Auctions', href: '#' },
      { text: 'Sell Items', href: '#' },
      { text: 'Featured Items', href: '#' },
    ],
    support: [
      { text: 'FAQ', href: '#' },
      { text: 'Shipping Info', href: '#' },
      { text: 'Returns & Refunds', href: '#' },
      { text: 'Contact Support', href: '#' },
    ],
  };

  return (
    <FooterSection>
      <Container>
        <FooterContent container spacing={4}>
          <Grid item xs={12} md={3}>
            <FooterColumn>
              <Typography variant="h6" component="h3" gutterBottom>
                AuctionHub
              </Typography>
              <Typography variant="body2">
                The world&apos;s most exciting auction platform for unique items and collectibles.
              </Typography>
            </FooterColumn>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant="h6" component="h3" gutterBottom>
                Quick Links
              </Typography>
              <FooterList>
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </FooterList>
            </FooterColumn>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant="h6" component="h3" gutterBottom>
                Help & Support
              </Typography>
              <FooterList>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </FooterList>
            </FooterColumn>
          </Grid>

          <Grid item xs={12} md={3}>
            <FooterColumn>
              <Typography variant="h6" component="h3" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                Email: support@auctionhub.com
                <br />
                Phone: +1 (555) 123-4567
                <br />
                Address: 123 Auction Street, New York, NY
              </Typography>
            </FooterColumn>
          </Grid>
        </FooterContent>

        <Copyright>
          <Typography variant="body2">&copy; 2023 AuctionHub. All rights reserved.</Typography>
        </Copyright>
      </Container>
    </FooterSection>
  );
};

export default Footer;
