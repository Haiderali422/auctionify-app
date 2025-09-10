import * as yup from 'yup';

export const addItemSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  image_url: yup.string().url('Must be a valid URL').required('Image URL is required'),
});
