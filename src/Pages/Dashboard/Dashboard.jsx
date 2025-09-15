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
import {
  getItems,
  clearError,
  removeItem,
  modifyItem,
  startAuction,
  getListedItems,
  getSoldItems,
  getUnsoldItems,
  payableItemsThunk,
  getPurchasedItems, // NEW
} from '../../features/itemSlice';
import { handlePayment as apiHandlePayment } from '../../api/auctionApi'; // improved API function (see below)
import ProfileSection from './ProfileSection';
import ItemDialog from './ItemDialog';
import ItemsTable from './ItemTable';
import AuctionDialog from './AuctionDialog';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [auctionDialogOpen, setAuctionDialogOpen] = useState(false);
  const [auctionItem, setAuctionItem] = useState(null);

  const dispatch = useDispatch();
  const {
    items,
    listedItems,
    soldItems,
    unsoldItems,
    payableItems,
    purchasedItems,
    loading,
    error,
  } = useSelector((state) => state.items || {});

  const user = useSelector((state) => state.user || {});
  const { firebase_uid, photo, created_at } = user || {};

  const navigate = useNavigate();
  const date = created_at
    ? new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  useEffect(() => {
    if (activeTab === 0 && firebase_uid) {
      dispatch(getItems(firebase_uid));
    } else if (activeTab === 1) {
      dispatch(getListedItems());
    } else if (activeTab === 2) {
      dispatch(payableItemsThunk());
    } else if (activeTab === 3) {
      dispatch(getPurchasedItems());
    } else if (activeTab === 4) {
      dispatch(getSoldItems());
    } else if (activeTab === 5) {
      dispatch(getUnsoldItems());
    }
  }, [activeTab, firebase_uid, dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setOpenDialog(true);
    if (firebase_uid) dispatch(getItems(firebase_uid));
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeItem(itemId)).then(() => {
        if (firebase_uid) dispatch(getItems(firebase_uid));
      });
    }
  };

  const handleToggleAuction = (item) => {
    const updatedItem = {
      ...item,
      auctionEnabled: !item.auctionEnabled,
    };
    dispatch(modifyItem({ itemId: item.itemId ?? item.id, itemData: updatedItem })).then(() =>
      dispatch(getItems(firebase_uid))
    );
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const handleOpenAuctionDialog = (item) => {
    setAuctionItem(item);
    setAuctionDialogOpen(true);
  };

  const handleConfirmAuction = (data) => {
    if (auctionItem) {
      dispatch(startAuction({ itemId: auctionItem.itemId ?? auctionItem.id, data }))
        .unwrap()
        .then(() => dispatch(getItems(firebase_uid)));
    }
    setAuctionDialogOpen(false);
    setAuctionItem(null);
  };

  const handlePay = async (auctionId) => {
    try {
      await apiHandlePayment(auctionId);
      dispatch(payableItemsThunk());
    } catch (err) {
      console.error('Payment error', err);
    }
  };

  let filteredItems = [];
  if (activeTab === 0) {
    filteredItems = Array.isArray(items) ? items.filter((i) => !i.auctionEnabled) : [];
  } else if (activeTab === 1) {
    filteredItems = Array.isArray(listedItems) ? listedItems : [];
  } else if (activeTab === 2) {
    filteredItems = Array.isArray(payableItems) ? payableItems : [];
  } else if (activeTab === 3) {
    filteredItems = Array.isArray(purchasedItems) ? purchasedItems : [];
  } else if (activeTab === 4) {
    filteredItems = Array.isArray(soldItems) ? soldItems : [];
  } else if (activeTab === 5) {
    filteredItems = Array.isArray(unsoldItems) ? unsoldItems : [];
  }

  if (showProfile) {
    return (
      <ProfileSection onBack={() => setShowProfile(false)} photoURL={photo} created_at={date} />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, position: 'relative' }}>
        <IconButton
          onClick={() => navigate('/')}
          sx={{ backgroundColor: 'primary.main', color: 'white', mr: 2, width: 35, height: 35 }}
          size="small"
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 700, color: 'primary.main', flexGrow: 1 }}
        >
          My Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={() => setShowProfile(true)}
          >
            Profile
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddItem}>
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
          <Tab label="Added Items" value={0} />
          <Tab label="Listed Items" value={1} />
          <Tab label="Won Items" value={2} />
          <Tab label="Purchased Items" value={3} />
          <Tab label="Sold Items" value={4} />
          <Tab label="Unsold Items" value={5} />
        </Tabs>
      </AppBar>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={handleCloseError}>
          {error.message || 'Something went wrong'}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <ItemsTable
          items={filteredItems}
          activeTab={activeTab}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
          onToggleAuction={handleToggleAuction}
          onAddItem={handleAddItem}
          onOpenAuctionDialog={handleOpenAuctionDialog}
          onPay={handlePay}
        />
      )}

      <ItemDialog open={openDialog} onClose={handleCloseDialog} editingItem={editingItem} />
      <AuctionDialog
        open={auctionDialogOpen}
        onClose={() => setAuctionDialogOpen(false)}
        onConfirm={handleConfirmAuction}
      />
    </Container>
  );
};

export default Dashboard;
