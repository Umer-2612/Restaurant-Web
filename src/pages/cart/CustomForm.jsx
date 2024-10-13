import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid2 } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import RHFButton from 'components/button/RHFButton';
import HookTextField from 'components/common/form-components/HookTextField'; // Input field component
import { validationSchema } from 'utils/validation'; // Your custom validation rules

// Validation schema
const CUSTOM_FORM_VALIDATION = Yup.object().shape({
  firstName: validationSchema.firstName,
  lastName: validationSchema.lastName,
  phoneNo: validationSchema.phoneNo,
  email: validationSchema.email,
});

const CustomForm = ({ handleCheckout, isLoading = false }) => {
  // Initialize form handling with validation
  const { control, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(CUSTOM_FORM_VALIDATION),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleCheckout)}
      sx={{
        width: '100%',
        padding: '20px',
        borderRadius: '8px',
        // boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Grid2 container spacing={2}>
        {/* First Name Field */}
        <Grid2
          item
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <HookTextField
            control={control}
            label="First Name*"
            name="firstName"
            fullWidth
          />
        </Grid2>

        {/* Last Name Field */}
        <Grid2
          item
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <HookTextField
            control={control}
            label="Last Name*"
            name="lastName"
            fullWidth
          />
        </Grid2>

        {/* Phone Field */}
        <Grid2
          item
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <HookTextField
            control={control}
            label="Phone no*"
            name="phoneNo"
            fullWidth
          />
        </Grid2>

        {/* Email Field */}
        <Grid2
          item
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <HookTextField
            control={control}
            label="Email*"
            name="email"
            fullWidth
          />
        </Grid2>

        {/* Submit Button */}
        <Grid2 item size={12} display="flex" justifyContent="end">
          <RHFButton
            isLoading={isLoading}
            variant="contained"
            color="primary"
            type="submit"
            title="Proceed to Payment"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

CustomForm.propTypes = {
  handleCheckout: PropTypes.func.isRequired, // Ensures handleCheckout is a required function
  isLoading: PropTypes.bool, // Ensures isLoading is a boolean, not required (defaults to false)
};

export default CustomForm;
