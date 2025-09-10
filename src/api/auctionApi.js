import api from '../api/api';

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
    console.log(response);

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
