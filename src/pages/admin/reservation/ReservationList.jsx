import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import NoRecordsFound from 'components/common/NoRecordsFound';
import TableWrapper from 'components/common/TableWapper';
import TableLayout from 'layouts/TableLayout';
import { useGetAllReservationQuery } from 'store/apis/reservation';

const ReservationList = () => {
  const [viewParams] = useSearchParams();

  // Get Members List
  const { data, isLoading, isFetching, isSuccess } = useGetAllReservationQuery(
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
    }
  );
  const reservationData = data?.data;

  const columns = [
    {
      id: 'name',
      title: 'Name',
      formatter: ({ row }) => {
        return (
          <Typography variant="body1">
            {row?.firstName} {row.lastName}
          </Typography>
        );
      },
    },
    {
      id: 'email',
      title: 'Email',
    },
    {
      id: 'noOfPeople',
      title: 'No of people',
    },
    {
      id: 'phoneNo',
      title: 'Contact Number',
    },
    {
      id: 'reservationDate',
      title: 'Reservation Date',
      formatter: ({ row }) => {
        return (
          <Typography variant="body1">
            {dayjs(row?.publishedOn).format('ddd, MMM DD - hh:mm A')}
          </Typography>
        );
      },
    },
  ];

  return (
    <Stack rowGap={2}>
      <Stack pl={4}>
        <Typography variant="h3">Reservation List</Typography>
      </Stack>
      <TableLayout>
        {data && data?.data?.length === 0 ? (
          <NoRecordsFound />
        ) : (
          <TableWrapper
            rows={reservationData}
            total={data?.paginationData?.total}
            columns={columns}
            loading={isLoading}
            isFetching={isFetching}
            isSuccess={isSuccess}
            hidePagination={!data?.paginationData?.total}
          />
        )}
      </TableLayout>
    </Stack>
  );
};

export default ReservationList;

ReservationList.propTypes = {
  isEditable: PropTypes.bool,
};
