import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { PropTypes } from 'prop-types';

import DialogLayout from 'layouts/DialogLayout';

const CartDetailsModal = ({ menuProps, handleMenuModalClose }) => {
  // Function to handle printing the order details
  const handlePrint = () => {
    const printContent = document.getElementById('print-section').innerHTML;
    const newWindow = window.open();
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <DialogLayout
      handleCloseDialog={() => {
        handleMenuModalClose();
      }}
      dialogActions={
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ borderRadius: 2, height: 36, px: 3 }}
            variant="outlined"
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            sx={{ borderRadius: 2, height: 36, px: 3 }}
            variant="contained"
            onClick={handleMenuModalClose}
          >
            Done
          </Button>
        </Stack>
      }
      openForm={menuProps?.isMenuOpen}
      title={'Order Details'}
    >
      <Stack id="print-section" spacing={2} sx={{ color: 'black', p: 2 }}>
        {menuProps?.cartDetails?.map((data) => {
          const item = data?.item;
          const quantity = data?.quantity;
          return (
            <Stack
              key={item?._id}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                p: 2,
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={item?.itemImagePath}
                alt={item?.itemName}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <Stack>
                <strong>{item?.itemName}</strong>
                <span>Quantity: {quantity}</span>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </DialogLayout>
  );
};

CartDetailsModal.propTypes = {
  menuProps: PropTypes.object,
  handleMenuModalClose: PropTypes.func,
};

export default CartDetailsModal;
