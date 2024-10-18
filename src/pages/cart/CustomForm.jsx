import React from 'react';

import { Box, Grid2 } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes

import HookTextField from 'components/common/form-components/HookTextField'; // Input field component

const CustomForm = ({ control, isLoading = false }) => {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <Grid2 container spacing={3}>
        {/* First Name Field */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <HookTextField
            control={control}
            label="First Name*"
            name="firstName"
            fullWidth
          />
        </Grid2>

        {/* Last Name Field */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <HookTextField
            control={control}
            label="Last Name*"
            name="lastName"
            fullWidth
          />
        </Grid2>

        {/* Phone Field */}
        <Grid2 item size={12}>
          <HookTextField
            control={control}
            label="Phone no*"
            name="phoneNo"
            fullWidth
            isPhoneNumber
          />
        </Grid2>

        {/* Email Field */}
        <Grid2 item size={12}>
          <HookTextField
            control={control}
            label="Email*"
            name="email"
            fullWidth
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

CustomForm.propTypes = {
  isLoading: PropTypes.bool, // Ensures isLoading is a boolean, not required (defaults to false)
  control: PropTypes.any,
};

export default CustomForm;
