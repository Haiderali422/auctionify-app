import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  Place as PlaceIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleItem, placeBidThunk } from '../../features/itemSlice';
import placeHolder from '../../assets/images/placeholder-image.jpg';

const DetailContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const BidSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
  border: `1px solid ${theme.palette.divider}`,
}));

const TimeBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: '#F72585',
  color: 'white',
  fontWeight: 600,
  padding: theme.spacing(1),
  fontSize: '1rem',
}));

const BidButton = styled(Button)(() => ({
  backgroundColor: '#F72585',
  color: 'white',
  fontWeight: 600,
  borderRadius: 6,
  padding: '0.5rem 0.5rem',
  '&:hover': {
    backgroundColor: '#e10c6f',
  },
}));

const ProductDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentItem: item, loading } = useSelector((state) => state.items);

  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (itemId) {
      dispatch(getSingleItem(itemId));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    if (!item?.auction?.endAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(item.auction.endAt).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Auction Ended');
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item]);
  const handlePlaceBid = () => {
    if (!item || !bidAmount) return;

    const auctionId = item.auction.auctionId;
    dispatch(placeBidThunk({ auctionId, amount: parseFloat(bidAmount) }));
    setBidAmount('');
  };

  if (loading) {
    return (
      <DetailContainer>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </DetailContainer>
    );
  }

  if (!item) {
    return (
      <DetailContainer>
        <Typography variant="h4" align="center">
          Product not found
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </DetailContainer>
    );
  }

  const auction = item.auction || {};
  const startingBid = auction.startingBid || 0;
  const highestBid = auction.highestBid?.amount || startingBid;
  const topBids = auction.topBids || [];
  const minimumBid = highestBid + highestBid * 0.05;

  return (
    <DetailContainer maxWidth="lg">
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back to Auctions
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImage
            src={item.imageUrl || placeHolder}
            alt={item.title}
            onError={(e) => {
              e.target.src = placeHolder;
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                color: '#3A0CA3',
              }}
            >
              {item.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                label={item.condition}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip label={item.category} color="secondary" variant="outlined" size="small" />
            </Box>

            <Typography variant="body1" paragraph sx={{ color: '#6C757D', fontSize: '1.1rem' }}>
              {item.description}
            </Typography>
          </Box>

          <BidSection elevation={0}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                color: '#3A0CA3',
                mb: 3,
              }}
            >
              Auction Details
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MoneyIcon color="primary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Current Bid
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontFamily: "'Roboto Mono', monospace" }}
                    >
                      ${highestBid.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon color="error" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Time Left
                    </Typography>
                    <TimeBadge label={timeLeft} />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MoneyIcon color="secondary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Starting Bid
                    </Typography>
                    <Typography variant="h6" color="secondary">
                      ${startingBid.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PlaceIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Location
                    </Typography>
                    <Typography variant="body2">{item.location || 'Not specified'}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Bid Form */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Place Your Bid
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Minimum bid: <strong>${minimumBid.toFixed(2)}</strong>
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  size="small"
                  type="number"
                  label="Your bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  inputProps={{
                    min: minimumBid.toFixed(2),
                    step: '0.01',
                  }}
                />
                <BidButton onClick={handlePlaceBid}>Place Bid</BidButton>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                Bid History ({topBids.length} bids)
              </Typography>

              {topBids.length > 0 ? (
                <List dense>
                  {topBids.map((bid, index) => (
                    <ListItem key={bid.bidId} divider={index < topBids.length - 1}>
                      <Avatar sx={{ mr: 2, bgcolor: '#3A0CA3' }}>
                        <PersonIcon />
                      </Avatar>
                      <ListItemText
                        primary={`$${bid.amount.toFixed(2)}`}
                        secondary={
                          <>
                            <Typography variant="body2" component="span">
                              by {bid.bidderName}
                            </Typography>
                            <br />
                            <Typography variant="caption" color="textSecondary">
                              {new Date(bid.createdAt).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No bids yet. Be the first to bid!
                </Typography>
              )}
            </Box>
          </BidSection>
        </Grid>
      </Grid>
    </DetailContainer>
  );
};

export default ProductDetail;
