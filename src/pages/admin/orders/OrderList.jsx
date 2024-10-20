import React, { useState } from 'react';

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
      perPage:
        isNaN(Number(viewParams.get('perPage'))) ||
        viewParams.get('perPage') <= 0
          ? 20
          : viewParams.get('perPage'),
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 300000,
    }
  );
  const orderData = data?.data;

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
          <IconButton onClick={() => handleMenuModalOpen({ cart: row })}>
            <VisibilityOutlined />
          </IconButton>
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
