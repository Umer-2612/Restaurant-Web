import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

const NoRecordsFound = ({ noDataMessage = 'No records found' }) => {
  return (
    <Stack
      height={300}
      bgcolor={(theme) => theme.palette.background.paper}
      borderRadius={3}
      justifyContent="center"
      alignItems="center"
    >
      <Typography>{noDataMessage}</Typography>
    </Stack>
  );
};

export default NoRecordsFound;

NoRecordsFound.propTypes = {
  noDataMessage: PropTypes.func,
};
