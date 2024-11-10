import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';

import DialogLayout from 'layouts/DialogLayout';
import './../index.css';

const CartDetailsModal = ({ menuProps, handleMenuModalClose }) => {
  const cartDetails = menuProps?.cartDetails?.cart;

  const handlePrint = () => {
    const newWindow = window.open('', '_blank');

    if (!newWindow) {
      alert('Please allow popups for this website');
      return;
    }

    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Restaurant Receipt</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .receipt-container {
                  max-width: 600px;
                  margin: 30px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .logo {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .logo img {
                  max-width: 150px;
              }
              .restaurant-name {
                  text-align: center;
                  font-size: 1.5em;
                  margin-bottom: 20px;
              }
              .details, .footer {
                  text-align: center;
                  margin-top: 20px;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
              }
              table, th, td {
                  border: 1px solid #ddd;
              }
              th, td {
                  padding: 8px;
                  text-align: left;
              }
              .total {
                  font-weight: bold;
              }
              .thankyou {
                  margin-top: 20px;
                  text-align: center;
                  font-weight: bold;
                  font-size: 1.2em;
              }
          </style>
      </head>
      <body>
          <div class="receipt-container">
              <div class="logo">
                  <img src="https://res.cloudinary.com/domcmqnwn/image/upload/v1729418279/Production-Restaurant-Menu/Punjabi-Touch-01-01-e1698190288737_dwd6hu.png" alt="Restaurant Logo">
              </div>
              <div class="restaurant-name">Punjabi Touch Indian Restaurant</div>
              <div class="details">
                  <p>Receipt ID: ${menuProps?.cartDetails?._id}</p>
                  <p>Date: ${menuProps?.cartDetails?.createdAt ? dayjs(menuProps?.cartDetails?.createdAt).format('MMM DD YYYY - hh:mm A') : '-'}</p>
              </div>
              <table>
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${cartDetails
                        ?.map((cart) =>
                          cart
                            ? `<tr key="${cart?.item?._id}">
                                <td>${cart?.item?.itemName}</td>
                                <td>${cart?.quantity}</td>
                                <td>${cart?.item?.itemPrice}</td>
                              </tr>`
                            : ''
                        )
                        .join('')}
                  </tbody>
              </table>
              <table>
                  <tbody>
                      <tr class="total">
                          <td>Total</td>
                          <td>Total: $${menuProps?.cartDetails?.totalPrice?.toFixed(2) || 'Payment Not Completed'}</td>
                      </tr>
                  </tbody>
              </table>
              <div class="thankyou">Thank you for choosing us!</div>
              <div class="footer">356 Middle Rd, Greenbank QLD 4124, Australia</div>
          </div>
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.onafterprint = function () {
      newWindow.close();
    };
  };

  return (
    <DialogLayout
      handleCloseDialog={handleMenuModalClose}
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
              {item?.itemImagePath ? (
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
              ) : (
                <Avatar sx={{ width: 60, height: 60, borderRadius: '8px' }}>
                  {item?.itemName?.charAt(0).toUpperCase() || 'A'}
                </Avatar>
              )}
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
            {/* <Typography variant="subtitle2">
              {menuProps?.cartDetails?.status}
            </Typography> */}
            <Chip
              label={
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                  color="#FE4040"
                >
                  <Typography variant="subtitle2">
                    {menuProps?.cartDetails?.status}
                  </Typography>
                </Stack>
              }
              sx={{
                backgroundColor: '#FEEAEA',
                cursor: 'pointer',
                borderRadius: 2,
              }}
            />
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
