import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import NoRecordsFound from 'components/common/NoRecordsFound';
import TableWrapper from 'components/common/TableWapper';
import TableLayout from 'layouts/TableLayout';
import {
  useGetAllReservationQuery,
  useReservationStatusUpdateMutation,
} from 'store/apis/reservation';

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
      pollingInterval: 20000,
    }
  );

  const [reservationStatusUpdate, { isLoading: isStatusLoading }] =
    useReservationStatusUpdateMutation();

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
    {
      id: 'action',
      title: 'Actions',
      formatter: ({ row }) => {
        return (
          <Stack direction="row" width="100%" gap={2}>
            <Button
              disabled={isStatusLoading}
              onClick={() =>
                reservationStatusUpdate({ _id: row?._id, status: 'Rejected' })
              }
            >
              Reject
            </Button>
            <Button
              disabled={isStatusLoading}
              sx={{
                color: (theme) => theme.palette.success.main,
              }}
              onClick={() =>
                reservationStatusUpdate({ _id: row?._id, status: 'Accepted' })
              }
            >
              Approve
            </Button>
          </Stack>
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
