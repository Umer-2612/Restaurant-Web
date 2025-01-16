import React, { useState } from 'react';

import PrintIcon from '@mui/icons-material/Print';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import CartDetailsModal from './components/CartDetailsModal';

import NoRecordsFound from 'components/common/NoRecordsFound';
import TableWrapper from 'components/common/TableWapper';
import TableLayout from 'layouts/TableLayout';
import { useGetAllOrdersQuery } from 'store/apis/orders';

const OrderList = () => {
  const [viewParams] = useSearchParams();
  const [menuProps, setMenuProps] = useState({
    cartDetails: null,
    isMenuOpen: false,
  });

  // Get Members List
  const { data, isLoading, isFetching, isSuccess } = useGetAllOrdersQuery(
    {
      search: viewParams.get('search'),
      page:
        isNaN(Number(viewParams.get('page'))) || viewParams.get('page') <= 0
          ? 1
          : viewParams.get('page'),
      limit:
        isNaN(Number(viewParams.get('limit'))) || viewParams.get('limit') <= 0
          ? 20
          : viewParams.get('limit'),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const orderData = data?.data;

  const handlePrint = (cart) => {
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
                  <p>Receipt ID: ${cart?._id}</p>
                  <p>Date: ${cart?.createdAt ? dayjs(cart?.createdAt).format('MMM DD YYYY - hh:mm A') : '-'}</p>
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
                      ${cart?.cart
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
                          <td>Total: $${cart?.totalPrice?.toFixed(2) || 'Payment Not Completed'}</td>
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

    // Add event listeners for both printing and closing
    newWindow.onbeforeprint = () => {
      window.location.href = '/admin/orders';
    };

    newWindow.onafterprint = () => {
      newWindow.close();
      window.location.href = '/admin/orders';
    };

    // Handle when user closes the window without printing
    newWindow.onunload = () => {
      window.location.href = '/admin/orders';
    };

    newWindow.print();
  };

  const columns = [
    {
      id: 'name',
      title: 'Customer Name',
      formatter: ({ row }) => {
        return (
          <Typography variant="body1">
            {row?.customerDetails?.firstName} {row?.customerDetails?.lastName}
          </Typography>
        );
      },
    },
    {
      id: 'email',
      title: 'Email',
      formatter: ({ row }) => {
        return <>{row?.customerDetails?.email}</>;
      },
    },
    {
      id: 'contact',
      title: 'Contact Number',
      formatter: ({ row }) => {
        return <>{row?.customerDetails?.phoneNo}</>;
      },
    },
    {
      id: 'createdAt',
      title: 'Order Date',
      formatter: ({ row }) => {
        return (
          <Typography variant="body1">
            {dayjs(row?.createdAt).format('ddd, MMM DD - hh:mm A')}
          </Typography>
        );
      },
    },
    {
      id: 'actions',
      formatter: ({ row }) => {
        return (
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => handleMenuModalOpen({ cart: row })}>
              <VisibilityOutlined />
            </IconButton>
            <IconButton onClick={() => handlePrint(row)}>
              <PrintIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const handleMenuModalOpen = ({ cart }) => {
    setMenuProps({ cartDetails: cart, isMenuOpen: true });
  };

  const handleMenuModalClose = () => {
    setMenuProps({ ...menuProps, isMenuOpen: false });
    setTimeout(() => {
      setMenuProps({ cartDetails: null, isMenuOpen: false });
    }, 200);
  };

  return (
    <Stack rowGap={2}>
      <Stack pl={4}>
        <Typography variant="h3">Order List</Typography>
      </Stack>
      <TableLayout>
        {data && data?.data?.length === 0 ? (
          <NoRecordsFound />
        ) : (
          <TableWrapper
            rows={orderData}
            total={data?.paginationData?.total}
            columns={columns}
            loading={isLoading}
            isFetching={isFetching}
            isSuccess={isSuccess}
            hidePagination={!data?.paginationData?.total}
          />
        )}
      </TableLayout>
      <CartDetailsModal
        menuProps={menuProps}
        handleMenuModalClose={handleMenuModalClose}
      />
    </Stack>
  );
};

export default OrderList;
