import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import placeHolder from '../../assets/images/placeholder-image.jpg';
import { placeBidThunk } from '../../features/itemSlice';
import { placeBid } from '../../api/auctionApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(() => ({
  maxWidth: 345,
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
  },
}));

const StyledCardMedia = styled(CardMedia)(() => ({
  height: 200,
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CardContentWrapper = styled(CardContent)(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  paddingBottom: 8,
}));

const StyledTitle = styled(Typography)(() => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: '#212529',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const StyledDescription = styled(Typography)(() => ({
  color: '#6C757D',
  marginBottom: '1rem',
  fontSize: '0.9rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const MetaContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
  alignItems: 'center',
}));

const CurrentBid = styled(Typography)(() => ({
  fontFamily: "'Roboto Mono', monospace",
  fontWeight: 600,
  color: '#3A0CA3',
}));

const TimeLeft = styled(Typography)(() => ({
  color: '#F72585',
  fontWeight: 600,
  fontSize: '0.9rem',
}));

const BidButton = styled(Button)(() => ({
  backgroundColor: '#F72585',
  color: 'white',
  fontWeight: 600,
  borderRadius: 6,
  padding: '0.5rem 1rem',
  '&:hover': {
    backgroundColor: '#e10c6f',
  },
}));

const DetailsButton = styled(Button)(() => ({
  backgroundColor: '#3A0CA3',
  color: 'white',
  fontWeight: 600,
  borderRadius: 6,
  padding: '0.5rem 1rem',
  '&:hover': {
    backgroundColor: '#2c0880',
  },
}));

const ExpandButton = styled(IconButton)(() => ({
  marginLeft: 'auto',
  padding: 0,
  color: '#6C757D',
}));

const AuctionCard = ({ item }) => {
  const [showBidInput, setShowBidInput] = useState(false);
  const [showBidList, setShowBidList] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auction = item.auction || {};
  const startingBid = auction.startingBid || 0;
  const highestBid = auction.highestBid?.amount || startingBid;
  const topBids = auction.topBids || [];

  useEffect(() => {
    if (!auction.endAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auction.endAt).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Ended');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auction.endAt]);

  const handlePlaceBid = () => {
    console.log('Placing bid:', bidAmount, 'on AuctionId:', auction.auctionId);
    dispatch(placeBidThunk({ auctionId: auction.auctionId, amount: bidAmount }));
    setBidAmount('');
    setShowBidInput(false);
  };

  const minimumBid = highestBid + highestBid * 0.05;

  return (
    <StyledCard>
      <StyledCardMedia component="img" image={item.imageUrl || placeHolder} alt={item.title} />

      <CardContentWrapper>
        <StyledTitle variant="h6">{item.title}</StyledTitle>
        <StyledDescription variant="body2">{item.description}</StyledDescription>

        <MetaContainer>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Current Bid
            </Typography>
            <CurrentBid>${highestBid.toFixed(2)}</CurrentBid>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="textSecondary">
              Ends At
            </Typography>
            <TimeLeft>{timeLeft}</TimeLeft>
          </Box>
        </MetaContainer>

        {/* Starting Bid */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption" color="textSecondary">
            Starting Bid:
          </Typography>
          <Typography variant="caption" fontWeight="600">
            ${startingBid.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" fontWeight="600">
              Top Bids ({topBids.length})
            </Typography>
            <ExpandButton onClick={() => setShowBidList(!showBidList)}>
              {showBidList ? <ExpandLess /> : <ExpandMore />}
            </ExpandButton>
          </Box>

          <Collapse in={showBidList} timeout="auto" unmountOnExit>
            {topBids.length > 0 ? (
              <List dense sx={{ py: 0, maxHeight: 120, overflow: 'auto' }}>
                {topBids.slice(0, 3).map((bid) => (
                  <ListItem key={bid.bidId} sx={{ px: 0, py: 0.5 }}>
                    <ListItemText
                      primary={`$${bid.amount.toFixed(2)}`}
                      secondary={`by ${bid.bidderName || 'Anonymous'}`}
                      primaryTypographyProps={{ variant: 'caption', fontWeight: 600 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="caption" color="textSecondary">
                No bids yet
              </Typography>
            )}
          </Collapse>
        </Box>
      </CardContentWrapper>

      <Divider sx={{ mx: 2 }} />

      <CardActions sx={{ py: 1.5 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <BidButton fullWidth onClick={() => setShowBidInput(!showBidInput)}>
              Place Bid
            </BidButton>
          </Grid>
          <Grid item xs={6}>
            <DetailsButton fullWidth onClick={() => navigate(`/item/${item.itemId}`)}>
              View Details
            </DetailsButton>
          </Grid>
        </Grid>
      </CardActions>

      <Collapse in={showBidInput}>
        <Box sx={{ p: 2, pt: 0 }}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label={`Min. bid: $${minimumBid.toFixed(2)}`}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            slotProps={{ min: minimumBid.toFixed(2), step: '0.01' }}
            sx={{ mb: 1 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handlePlaceBid}
            sx={{
              backgroundColor: '#4CC9F0',
              '&:hover': { backgroundColor: '#3AA9D0' },
            }}
          >
            Submit Bid
          </Button>
        </Box>
      </Collapse>
    </StyledCard>
  );
};

const AuctionGrid = ({ auctionItems = [] }) => {
  if (!auctionItems || auctionItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px', padding: 3 }}>
        <Typography variant="h6" color="textSecondary">
          No live auctions available
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {auctionItems.map((item) => (
        <Grid item key={item.itemId} xs={12} sm={6} md={4} lg={3}>
          <AuctionCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AuctionCard;
export { AuctionGrid };
