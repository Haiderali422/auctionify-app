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

    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const createItem = async () => {
  try {
    const response = await api.post('/users/items/', {
      title: 'first Item',
      description: 'the first created item',
      image_url: 'https://share.google/images/fFSoHWNcCs9Jj6ona',
    });
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

export const addItem = async () => {
  try {
    const response = await api.get('/users/items/added');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};

export const updateItem = async (id, newItem) => {
  try {
    const response = await api.patch(`/users/items/${id}`, { newItem });
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

export const health = async () => {
  try {
    const response = await api.get('/health/');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
};
