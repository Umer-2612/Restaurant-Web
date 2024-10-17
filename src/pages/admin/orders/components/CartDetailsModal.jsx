import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

import DialogLayout from 'layouts/DialogLayout';
import './../index.css';

const CartDetailsModal = ({ menuProps, handleMenuModalClose }) => {
  // Function to handle printing the order details
  const handlePrint = () => {
    const printContent = document.getElementById('print-section').innerHTML;
    const newWindow = window.open();

    newWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              width: 100%; /* Width of a typical receipt */
            }
            #print-section {
              padding: 20px;
              color: black;
              border: 1px solid #ccc;
              border-radius: 10px;
            }
            .header {
              text-align: center;
              margin-bottom: 10px;
            }
            .header h1 {
              margin: 0;
              font-size: 20px;
            }
            .header p {
              margin: 0;
              font-size: 12px;
            }
            .item {
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
            }
            .item-name {
              font-size: 14px;
              flex-grow: 1;
            }
            .item-quantity {
              font-size: 14px;
            }
            .item-price {
              font-size: 14px;
            }
            .total {
              margin-top: 10px;
              font-weight: bold;
              font-size: 16px;
              text-align: right;
            }
            hr {
              margin: 10px 0;
              border: 0;
              border-top: 1px dashed #ccc;
            }
            .thank-you {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
            }
            button {
              display: none; /* Hide buttons in print view */
            }
          </style>
        </head>
        <body>
          <div id="print-section">
            <div class="header">
              <h1>Your Restaurant Name</h1>
              <p>Address, City, State, Zip</p>
              <p>Phone Number</p>
            </div>
            <hr />
            ${printContent}
            <hr />
            <div class="total">Total: $${menuProps?.cartDetails?.totalAmount?.toFixed(2) || 1000}</div>
            <div class="thank-you">Thank you for dining with us!</div>
          </div>
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  const cartDetails = menuProps?.cartDetails?.cart;
  console.log(menuProps);
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
        {cartDetails?.map((data) => {
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
        <Stack alignItems="end">
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body2">Payment Status:</Typography>
            <Typography variant="subtitle2">
              {menuProps?.cartDetails?.status}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </DialogLayout>
  );
};

CartDetailsModal.propTypes = {
  menuProps: PropTypes.object,
  handleMenuModalClose: PropTypes.func,
};

export default CartDetailsModal;
