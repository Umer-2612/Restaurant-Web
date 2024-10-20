import React from 'react';

import { Button, Chip, Tooltip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import NoRecordsFound from 'components/common/NoRecordsFound';
import TableWrapper from 'components/common/TableWapper';
import TableLayout from 'layouts/TableLayout';
import {
  useContactUsStatusUpdateMutation,
  useGetAllQueriesQuery,
} from 'store/apis/contactUs';

const QueryList = () => {
  const [viewParams] = useSearchParams();

  // Get Members List
  const { data, isLoading, isFetching, isSuccess } = useGetAllQueriesQuery(
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

  const [contactUsStatusUpdate, { isLoading: isStatusLoading }] =
    useContactUsStatusUpdateMutation();
  const queryData = data?.data;

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
      id: 'message',
      title: 'Message',
      formatter: ({ row }) => {
        return (
          <Tooltip title={row?.message} arrow>
            <Stack width="250px" overflow="hidden">
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {row?.message}
              </Typography>
            </Stack>
          </Tooltip>
        );
      },
    },
    {
      id: 'phoneNo',
      title: 'Contact Number',
    },
    {
      id: 'createdAt',
      title: 'Contact Date',
      formatter: ({ row }) => {
        return (
          <Typography variant="body1">
            {dayjs(row?.createdAt).format('ddd, MMM DD - hh:mm A')}
          </Typography>
        );
      },
    },
    {
      id: 'action',
      title: 'Actions',
      formatter: ({ row }) => {
        if (row?.status === 'Responded') {
          return (
            <>
              <Stack
                direction="row"
                width="100%"
                gap={2}
                justifyContent={'left'}
              >
                <Chip
                  label={
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      gap={1}
                      color="#FE4040"
                    >
                      <Typography variant="body3">Responded</Typography>
                    </Stack>
                  }
                  sx={{
                    backgroundColor: '#FEEAEA',
                    cursor: 'pointer',
                    borderRadius: 2,
                    width: '110px',
                  }}
                />
              </Stack>
            </>
          );
        } else {
          return (
            <Stack direction="row" width="100%" gap={2}>
              <Button
                disabled={isStatusLoading}
                onClick={() =>
                  contactUsStatusUpdate({ _id: row?._id, status: 'Responded' })
                }
                sx={{
                  height: '32px',
                  width: '110px',
                  borderRadius: 2,
                }}
                variant="outlined"
              >
                Respond
              </Button>
            </Stack>
          );
        }
      },
    },
  ];

  return (
    <Stack rowGap={2}>
      <Stack pl={4}>
        <Typography variant="h3">Queries List</Typography>
      </Stack>
      <TableLayout>
        {data && data?.data?.length === 0 ? (
          <NoRecordsFound />
        ) : (
          <TableWrapper
            rows={queryData}
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

export default QueryList;

QueryList.propTypes = {
  isEditable: PropTypes.bool,
};
