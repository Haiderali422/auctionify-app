import api from '../api/api';
import { loadStripe } from '@stripe/stripe-js';

export const getUser = async () => {
  try {
    const response = await api.post('/users/save-profile');
    console.log('resposne from get user', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchItems = async () => {
  try {
    const response = await api.get('/users/items/added');
    console.log(response);
    console.log('res from fetch', response.data);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const createItem = async (data) => {
  try {
    const response = await api.post('/users/items/', data);
    console.log('response from create item', response);

    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const listedItem = async () => {
  try {
    const response = await api.get('/users/items/listed');
    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const alllistedItem = async () => {
  try {
    const response = await api.get('/users/items/listed/all');
    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const addItem = async () => {
  try {
    const response = await api.get('/users/items/added');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const updateItem = async (id, newData) => {
  try {
    const response = await api.patch(`/users/items/${id}`, newData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/users/items/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const startAuction = async (id, data) => {
  try {
    const response = await api.post(`/auctions/start/${id}`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const unSoldItems = async () => {
  try {
    const response = await api.get(`/users/items/unsold`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const soldItems = async () => {
  try {
    const response = await api.get(`/users/items/sold`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const placeBid = async (auctionId, amount) => {
  try {
    const response = await api.post(`/auctions/${auctionId}/bids`, { amount });
    console.log(response);

    console.log('Bid placed successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error placing bid:', error.response?.data || error.message);
    throw error;
  }
};

export const getPayableItems = async () => {
  try {
    const response = await api.get(`/users/items/payable`);
    console.log('The response from payableItems', response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const paymentSuccess = async () => {
  try {
    const response = await api.post(`/payments/create-checkout-session`, {
      auctionId: 18,
      successUrl: 'http://localhost:5173/payment-success',
      cancelUrl: 'http://localhost:5173/payment-cancel',
    });
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const purchaseItem = async () => {
  try {
    const response = await api.get(`/users/items/purchased`);
    console.log('Purchase', response);

    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const singleItem = async (id) => {
  try {
    const response = await api.get(`/users/items/listed/${id}`);
    console.log('singleItem', response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const handlePayment = async (auctionId) => {
  const yourFirebaseToken = localStorage.getItem('accessToken');

  try {
    const { data } = await api.post(
      '/payments/create-checkout-session',
      {
        auctionId,
        successUrl: 'http://localhost:5173/payment-success',
        cancelUrl: 'http://localhost:5173/payment-cancel',
      },
      {
        headers: { Authorization: `Bearer ${yourFirebaseToken}` },
      }
    );
    console.log('res from stripe data', data);

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
  }
};
