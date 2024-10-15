import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

const DialogLayout = ({
  children,
  handleFormSubmit,
  openForm,
  dialogActions,
  title = '',
  handleCloseDialog,
  contentSx = {},
  isDataLoading = false,
}) => {
  return (
    <Dialog
      open={openForm}
      sx={{ p: 2 }}
      PaperProps={{
        // component: 'form',
        // onSubmit: handleFormSubmit,
        sx: {
          borderRadius: 3,
          width: 500,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.other.border}`,
          px: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          height={27}
        >
          <Typography variant="subtitle2">{title}</Typography>
          <IconButton edge="start" color="inherit" onClick={handleCloseDialog}>
            <CloseIcon sx={{ color: (theme) => theme.palette.grey[800] }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent style={{ paddingTop: 16, padding: 16, ...contentSx }}>
        {isDataLoading ? (
          <Stack alignItems="center">
            <CircularProgress size={32} />
          </Stack>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
          borderTop: (theme) => `1px solid ${theme.palette.other.border}`,
        }}
      >
        {dialogActions}
      </DialogActions>
    </Dialog>
  );
};

export default DialogLayout;

DialogLayout.propTypes = {
  handleFormSubmit: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  openForm: PropTypes.bool,
  children: PropTypes.any,
  dialogActions: PropTypes.any,
  title: PropTypes.string,
  contentSx: PropTypes.object,
  isDataLoading: PropTypes.bool,
};
