import * as yup from 'yup';

export const auctionSchema = yup.object().shape({
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
