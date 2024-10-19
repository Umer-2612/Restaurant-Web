import React from 'react';

import { Box, Grid2 } from '@mui/material';
import PropTypes from 'prop-types';

import HookTextField from 'components/common/form-components/HookTextField';

const TEXT_FIELD_SX = {
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: (theme) => theme.palette.background.border,
    border: 'none',
  },
  '& input::placeholder': {
    color: (theme) => `${theme.palette.text.placeholder} !important`, // Customize placeholder color
    opacity: '1 !important',
  },
  'input': {
    color: (theme) => theme.palette.text.secondary,
    background: (theme) => theme.palette.background.paper,
    borderRadius: 3,
  },
};

const CustomForm = ({ control, isLoading = false }) => {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <Grid2 container spacing={4}>
        {/* First Name Field */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <HookTextField
            control={control}
            label="First Name*"
            name="firstName"
            fullWidth
            customInputStyles={TEXT_FIELD_SX}
          />
        </Grid2>

        {/* Last Name Field */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <HookTextField
            control={control}
            label="Last Name*"
            name="lastName"
            fullWidth
            customInputStyles={TEXT_FIELD_SX}
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
            customInputStyles={TEXT_FIELD_SX}
          />
        </Grid2>

        {/* Email Field */}
        <Grid2 item size={12}>
          <HookTextField
            control={control}
            label="Email*"
            name="email"
            fullWidth
            customInputStyles={TEXT_FIELD_SX}
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
