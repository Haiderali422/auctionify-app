import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: 'white',
  padding: theme.spacing(8, 2, 3),
  marginTop: theme.spacing(8),
}));

const FooterColumn = styled(Box)(({ theme }) => ({
  '& h6': {
    color: 'white',
    marginBottom: theme.spacing(2),
    fontSize: '1.1rem',
    fontWeight: 600,
  },
  '& p': {
    color: theme.palette.grey[400],
    lineHeight: 1.6,
  },
}));

const FooterList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& li': {
    marginBottom: theme.spacing(1.2),
  },
  '& a': {
    color: theme.palette.grey[400],
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.main,
      paddingLeft: '4px',
    },
  },
}));

const SocialBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2),
}));

const Copyright = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(3),
  borderTop: '1px solid #444',
  color: theme.palette.grey[500],
  fontSize: '0.9rem',
  marginTop: theme.spacing(5),
}));

const Footer = () => {
  const footerLinks = {
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
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <FooterColumn>
              <Typography variant="h6">AuctionHub</Typography>
              <Typography variant="body2">
                The world&apos;s most exciting auction platform for unique items and collectibles.
              </Typography>
              <SocialBox>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Facebook />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Twitter />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Instagram />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <LinkedIn />
                </IconButton>
              </SocialBox>
            </FooterColumn>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant="h6">Quick Links</Typography>
              <FooterList>
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </FooterList>
            </FooterColumn>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant="h6">Help & Support</Typography>
              <FooterList>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </FooterList>
            </FooterColumn>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <FooterColumn>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="body2">
                Email: support@auctionhub.com
                <br />
                Phone: +1 (555) 123-4567
                <br />
                Address: 123 Auction Street, New York, NY
              </Typography>
            </FooterColumn>
          </Grid>
        </Grid>

        <Copyright>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} AuctionHub. All rights reserved.
          </Typography>
        </Copyright>
      </Container>
    </FooterSection>
  );
};

export default Footer;
