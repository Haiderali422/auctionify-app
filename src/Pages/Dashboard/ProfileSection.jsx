import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Grid,
} from '@mui/material';
import {
  Email as EmailIcon,
  AccountCircle as AccountCircleIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const ProfileSection = ({ onBack }) => {
  const { displayName, email } = useSelector((state) => state.user);
  console.log(displayName);
  console.log(email);

  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
          Back to Dashboard
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" gutterBottom>
              {displayName || 'User Name'}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <EmailIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 1 }} />
              {email || 'user@example.com'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Member since {'January 2023'}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="primary">
                8
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Items Listed
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="secondary">
                24
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Bids
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="success.main">
                3
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Purchases
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Notification Preferences" />
            <Switch defaultChecked />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payment Methods" />
            <Button variant="outlined" size="small">
              Manage
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
