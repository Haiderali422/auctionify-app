import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  IconButton,
} from '@mui/material';
import { Person as PersonIcon, Add as AddIcon } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getItems, clearError, removeItem, modifyItem } from '../../features/itemSlice';
import ProfileSection from './ProfileSection';
import ItemDialog from './ItemDialog';
import ItemsTable from './ItemTable';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const { firebase_uid, photo, created_at } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const date = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    if (firebase_uid) {
      dispatch(getItems());
    }
  }, [dispatch, firebase_uid]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setOpenDialog(true);
    dispatch(getItems());
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeItem(itemId));
    }
  };

  const handleToggleAuction = (item) => {
    const updatedItem = {
      ...item,
      auction_enabled: !item.auction_enabled,
    };
    dispatch(modifyItem({ itemId: firebase_uid, itemData: updatedItem }));
    dispatch(getItems());
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const filteredItems = Array.isArray(items)
    ? items.filter((item) => {
        if (activeTab === 0) return true;
        if (activeTab === 1) return item.auctionStatus === 'on';
        if (activeTab === 2) return item.purchased;
        return true;
      })
    : [];

  if (showProfile) {
    return (
      <ProfileSection onBack={() => setShowProfile(false)} photoURL={photo} created_at={date} />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            mr: 2,
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'translateX(-2px)',
            },
            transition: 'all 0.2s ease-in-out',
            boxShadow: 2,
            width: 35,
            height: 35,
          }}
          size="small"
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            flexGrow: 1,
          }}
        >
          My Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={() => setShowProfile(true)}
            sx={{
              borderRadius: 2,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                backgroundColor: 'primary.light',
                color: 'white',
              },
            }}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      <AppBar
        position="static"
        color="default"
        sx={{
          borderRadius: 2,
          mb: 3,
          boxShadow: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: '1rem',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Tab label="Added Items" />
          <Tab label="Listed Items" />
          <Tab label="Purchased Items" />
        </Tabs>
      </AppBar>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
          onClose={handleCloseError}
        >
          {error.message || 'Something went wrong'}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: 'primary.main',
            }}
          />
        </Box>
      ) : (
        <ItemsTable
          items={filteredItems}
          activeTab={activeTab}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
          onToggleAuction={handleToggleAuction}
          onAddItem={handleAddItem}
        />
      )}

      <ItemDialog open={openDialog} onClose={handleCloseDialog} editingItem={editingItem} />
    </Container>
  );
};

export default Dashboard;
