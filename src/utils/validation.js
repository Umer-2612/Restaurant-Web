import * as Yup from 'yup';
export const validationSchema = {
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phoneNo: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number is not valid') // Ensure only numbers are allowed
    .min(10, 'Phone number must be exactly 10 digits') // Minimum 10 digits
    .max(10, 'Phone number must be exactly 10 digits'), // Maximum 10 digits
  email: Yup.string().required('Email is required').email('Email is not valid'),
  noOfPeople: Yup.number()
    .nullable() // Allow the field to be nullable
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Number of people is required')
    .positive('Number must be positive')
    .integer('Must be an integer'),
  reservationDate: Yup.date()
    .nullable() // Allow date to be nullable
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Date is required'), // Keep date as required
  message: Yup.string().required('Message is required'),
};
