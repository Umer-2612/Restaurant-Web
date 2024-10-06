import React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';
import { PropTypes } from 'prop-types';

export default function TableLayout({ children }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      height="100%"
      overflow="auto"
    >
      <Box width="100%" height="inherit" overflow="auto">
        <Paper
          elevation={0}
          display="flex"
          width="100%"
          sx={{
            borderRadius: 3,
            height: 'inherit',
            overflow: 'auto',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
}
TableLayout.propTypes = {
  children: PropTypes.any,
};
