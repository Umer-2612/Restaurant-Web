import React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip, IconButton, Tooltip } from '@mui/material';
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
      limit:
        isNaN(Number(viewParams.get('limit'))) || viewParams.get('limit') <= 0
          ? 20
          : viewParams.get('limit'),
    },
    {
      refetchOnMountOrArgChange: true,
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
            {dayjs(row?.reservationDate).format('ddd, MMM DD,hh:mm A')}
          </Typography>
        );
      },
    },
    {
      id: 'action',
      title: 'Actions',
      formatter: ({ row }) => {
        if (row?.status === 'Rejected') {
          return (
            <>
              <Stack direction="row" width="100%" gap={2}>
                <Chip
                  label={
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      gap={1}
                      color="#FE4040"
                    >
                      <Typography variant="body3">Rejected</Typography>
                    </Stack>
                  }
                  sx={{
                    backgroundColor: '#FEEAEA',
                    cursor: 'pointer',
                    borderRadius: 2,
                  }}
                />
              </Stack>
            </>
          );
        } else if (row?.status === 'Accepted') {
          return (
            <>
              <Stack direction="row" width="100%" gap={2}>
                <Chip
                  label={
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      gap={1}
                      color="#23C55E"
                    >
                      <Typography variant="body3">Approved</Typography>
                    </Stack>
                  }
                  sx={{
                    backgroundColor: '#EBFFF2',
                    cursor: 'pointer',
                    borderRadius: 2,
                  }}
                />
              </Stack>
            </>
          );
        } else {
          return (
            <Stack direction="row" width="100%" gap={2}>
              <Tooltip title="Reject">
                <span>
                  {' '}
                  <IconButton
                    disabled={isStatusLoading}
                    onClick={() =>
                      reservationStatusUpdate({
                        _id: row?._id,
                        status: 'Rejected',
                      })
                    }
                    sx={{
                      'bgcolor': '#FEEAEA',
                      '&: hover': {
                        bgcolor: '#FEEAEA',
                      },
                    }}
                  >
                    <CancelIcon sx={{ color: '#FE4040', fontSize: '1.5rem' }} />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Approve">
                <span>
                  {' '}
                  <IconButton
                    disabled={isStatusLoading}
                    onClick={() =>
                      reservationStatusUpdate({
                        _id: row?._id,
                        status: 'Accepted',
                      })
                    }
                    sx={{
                      'bgcolor': '#EBFFF2',
                      '&: hover': {
                        bgcolor: '#EBFFF2',
                      },
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ color: '#23C55E', fontSize: '1.5rem' }}
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          );
        }
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
