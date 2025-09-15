import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  CheckCircleOutline as SuccessIcon,
  ShoppingBag as ShoppingIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasedItems } from '../../features/itemSlice';

const PaymentSuccess = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { purchasedItems, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getPurchasedItems());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!purchasedItems || purchasedItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          No purchased items found.
        </Typography>
      </Container>
    );
  }

  const orderData = purchasedItems[purchasedItems.length - 1];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ p: 3, textAlign: 'center' }}>
        <CardContent>
          <SuccessIcon
            sx={{
              fontSize: 80,
              color: theme.palette.success.main,
              mb: 2,
            }}
          />

          <Typography variant="h3" component="h1" gutterBottom>
            Payment Successful!
          </Typography>

          <Typography variant="h6" color="text.secondary" paragraph>
            Thank you for your purchase. Your order has been confirmed.
          </Typography>

          <Typography variant="body1" paragraph>
            Your Purchase item show at purchase section
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
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

export default PaymentSuccess;
