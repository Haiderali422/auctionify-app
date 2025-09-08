import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  AppBar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Person as PersonIcon, Add as AddIcon } from '@mui/icons-material';
import { getItems, clearError } from '../../features/itemSlice';
import ProfileSection from './ProfileSection';
import ItemsGrid from './ItemsGrid';
import ItemDialog from './ItemDialog';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getItems(id));
    }
  }, [dispatch, id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setOpenDialog(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  // Filter items based on active tab
  const filteredItems = items.filter((item) => {
    if (activeTab === 0) return true; // All items (Added Items)
    if (activeTab === 1) return item.auctionStatus === 'on'; // Listed Items (Auction ON)
    if (activeTab === 2) return item.purchased; // Purchased Items
    return true;
  });

  if (showProfile) {
    return <ProfileSection onBack={() => setShowProfile(false)} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Dashboard
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={() => setShowProfile(true)}
            sx={{ mr: 2, borderRadius: 2 }}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            sx={{ borderRadius: 2 }}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      <AppBar position="static" color="default" sx={{ borderRadius: 2, mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Added Items" />
          <Tab label="Listed Items" />
          <Tab label="Purchased Items" />
        </Tabs>
      </AppBar>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={handleCloseError}>
          {error.message || 'Something went wrong'}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : (
        <ItemsGrid
          items={filteredItems}
          activeTab={activeTab}
          onEditItem={handleEditItem}
          onClick={handleAddItem}
        />
      )}

      <ItemDialog open={openDialog} onClose={handleCloseDialog} editingItem={editingItem} />
    </Container>
  );
};

export default Dashboard;
