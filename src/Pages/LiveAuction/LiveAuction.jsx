import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuctionGrid } from '../../Components/AuctionCard/AuctionCard';
import { liveAuction } from '../../features/itemSlice';
import { CircularProgress, Box, Alert } from '@mui/material';

const LiveAuction = () => {
  const dispatch = useDispatch();
  const { liveAuctions, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(liveAuction());

    const interval = setInterval(() => {
      dispatch(liveAuction());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading && liveAuctions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <AuctionGrid auctionItems={liveAuctions || []} />
    </div>
  );
};

export default LiveAuction;
