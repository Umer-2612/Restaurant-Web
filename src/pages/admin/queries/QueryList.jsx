import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import TableWrapper from 'components/common/TableWapper';
import TableLayout from 'layouts/TableLayout';
import { useGetAllQueriesQuery } from 'store/apis/contactUs';

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
    }
  );
  const queryData = data?.data;
  console.log(queryData);

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
  ];

  return (
    <Stack rowGap={2}>
      <Stack>
        {data && data?.data?.length === 0 ? (
          'No Records Found'
        ) : (
          <TableLayout>
            <TableWrapper
              rows={queryData}
              total={data?.paginationData?.total}
              columns={columns}
              loading={isLoading}
              isFetching={isFetching}
              isSuccess={isSuccess}
              hidePagination={!data?.paginationData?.total}
            />
          </TableLayout>
        )}
      </Stack>
    </Stack>
  );
};

export default QueryList;

QueryList.propTypes = {
  isEditable: PropTypes.bool,
};
