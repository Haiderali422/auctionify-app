import * as yup from 'yup';

export const itemSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  image_url: yup.string().url('Must be a valid URL').required('Image URL is required'),
  auctionStatus: yup.string().oneOf(['on', 'off']).required(),
  startingBid: yup.number().when('auctionStatus', {
    is: 'on',
    then: (schema) =>
      schema
        .typeError('Starting bid must be a number')
        .positive('Starting bid must be positive')
        .required('Starting bid is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
