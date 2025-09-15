import { Container, Typography, Box, Button, Card, CardContent, useTheme } from '@mui/material';
import {
  CancelOutlined as CancelIcon,
  ShoppingCart as CartIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ p: 3, textAlign: 'center' }}>
        <CardContent>
          <CancelIcon
            sx={{
              fontSize: 80,
              color: theme.palette.error.main,
              mb: 2,
            }}
          />

          <Typography variant="h3" component="h1" gutterBottom>
            Payment Cancelled
          </Typography>

          <Typography variant="h6" color="text.secondary" paragraph>
            Your payment was cancelled. No charges have been made to your account.
          </Typography>

          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: 2,
              p: 3,
              my: 4,
            }}
          >
            <Typography variant="body1" paragraph>
              If you encountered any issues during the payment process, you can:
            </Typography>

            <Typography variant="body2" component="ul" sx={{ textAlign: 'left', pl: 2 }}>
              <li>Try again with a different payment method</li>
              <li>Check if your card details are correct</li>
              <li>Contact your bank for authorization issues</li>
              <li>Reach out to our support team for assistance</li>
            </Typography>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                background: 'linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2c0880 0%, #3A0CA3 100%)',
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentCancel;
