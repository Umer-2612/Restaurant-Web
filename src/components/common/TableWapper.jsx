import React, { useLayoutEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { useSearchParams, useLocation } from 'react-router-dom';

import { CustomPagination } from './CommonComponents';

const RenderTableRows = ({
  row,
  keyProp,
  index,
  rowClick,
  columns,
  startIndex,
  hidePagination = false,
  rows,
}) => {
  return (
    <TableRow
      key={row[keyProp] || index}
      onClick={(e) => {
        return rowClick?.(row?._id);
      }}
      hover
      sx={{
        'borderTop': index === 0 ? '1px' : 0,
        'borderRight': 0,
        'borderLeft': 0,
        'borderBottom':
          hidePagination && rows?.length - 1 === index ? 0 : '1px',
        'borderStyle': 'solid',
        'borderColor': (theme) => theme.palette.other.border,
        'transition': '0.2s',
        'cursor': row?.isHighlight ? 'pointer' : 'default',
        '&.MuiTableRow-root:hover': {
          backgroundColor: ({ palette }) => {
            return palette.background.tableRow;
          },
          borderTop: (theme) =>
            index === 0 && `1.02px solid ${theme.palette.background.active}`,
        },
      }}
    >
      <TableCell
        sx={{
          fontSize: '14px',
          px: 2,
          py: 1.2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="secondary">
            {index + startIndex + 1}
          </Typography>
        </Box>
      </TableCell>
      {columns?.map((column, colIndex) => {
        return (
          <TableCell
            key={`${column.id} ${colIndex}`}
            sx={{
              fontSize: column.title === 'Reason' ? '12px' : '14px',
              px: 2,
              py: 1.2,
            }}
          >
            <Stack flexDirection="row" flexWrap="nowrap" alignItems="center">
              <Typography
                sx={{
                  minWidth: 'fit-content',
                  textWrap: 'nowrap',
                  color: (theme) => theme.palette.text.secondary,
                }}
                variant="body2"
                component="span"
                width={column?.id === 'action' && '100%'}
                display={column?.id === 'action' && 'flex'}
                justifyContent={column?.id === 'action' && 'end'}
              >
                {column.formatter
                  ? column.formatter({
                      row,
                      cell: row[column.id],
                      index,
                    })
                  : row[column.id]}
              </Typography>
            </Stack>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const RenderTableSkeleton = ({ columns }) => {
  return Array.from({ length: 8 }).map((_, rowIndex) => (
    <TableRow
      key={rowIndex}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.other.border}`,
        minWidth: 'fit-content',
      }}
    >
      {Array.from({ length: columns?.length + 1 }).map((_, cellIndex) => (
        <TableCell key={cellIndex} sx={{ py: 3 }}>
          <Skeleton variant="rounded" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

RenderTableSkeleton.propTypes = {
  columns: PropTypes.array,
};

function TableWrapper({
  rows = [],
  total,
  columns,
  loading = false,
  isFetching = false,
  isSuccess = false,
  keyProp = '_id',
  hidePagination = false,
  rowPerPageArray = [20, 40, 60, 80],
  rowClick,
  isInlineOptionUpdating = false,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const page =
    isNaN(Number(searchParams.get('page'))) || searchParams.get('page') <= 0
      ? 1
      : searchParams.get('page');
  const perPage =
    isNaN(Number(searchParams.get('perPage'))) ||
    searchParams.get('perPage') <= 0
      ? 20
      : searchParams.get('perPage');

  const [success, setIsSuccess] = useState(isSuccess);

  useLayoutEffect(() => {
    if (
      searchParams.get('page') &&
      (searchParams.get('page') <= 0 || isNaN(Number(searchParams.get('page'))))
    ) {
      searchParams.set('page', '1');
      setSearchParams(searchParams, { replace: true });
    }
    if (
      searchParams.get('perPage') &&
      (searchParams.get('perPage') <= 0 ||
        isNaN(Number(searchParams.get('perPage'))))
    ) {
      searchParams.set('perPage', '20');
      setSearchParams(searchParams, { replace: true });
    }
  }, [location, searchParams, setSearchParams]);

  useLayoutEffect(() => {
    if (page <= 0) {
      searchParams.set('page', 1);
      setSearchParams(searchParams, { replace: true });
    } else if (success && rows.length === 0 && page !== 1) {
      setIsSuccess(false);
      searchParams.set('page', Math.ceil(total / perPage));
      setSearchParams(searchParams, { replace: true });
    } else if (
      isSuccess &&
      page * (Math.ceil(total / perPage) < page) &&
      page > 2
    ) {
      searchParams.set('page', Math.ceil(total / perPage));
      setSearchParams(searchParams, { replace: true });
    } else if (isSuccess && page * (Math.ceil(total / perPage) < page)) {
      searchParams.set('page', Math.ceil(total / perPage));
      setSearchParams(searchParams, { replace: true });
    }
  }, [
    page,
    rows,
    searchParams,
    setSearchParams,
    isSuccess,
    total,
    perPage,
    success,
    isFetching,
  ]);

  return (
    <Box position="relative">
      {!loading && isInlineOptionUpdating && (
        <Stack
          height="100%"
          width="100%"
          sx={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <Box
            sx={{ py: 4, width: { xs: 'auto', sm: '100%' } }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={40} />
          </Box>
        </Stack>
      )}
      <TableContainer
        sx={{
          borderCollapse: 'collapse',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderColor: (theme) => theme.palette.other.border,
          border: 'none',
        }}
      >
        <Table>
          <TableHead
            sx={{
              background: (theme) => theme.palette.background.paper,
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  minWidth: 'fit-content',
                  textWrap: 'nowrap',
                  p: 2,
                }}
              >
                <Typography sx={{ color: (theme) => theme.palette.text.title }}>
                  #
                </Typography>
              </TableCell>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    ...column.style,
                    color: (theme) => theme.palette.text.primary,
                    minWidth: 'fit-content',
                    textWrap: 'nowrap',
                    p: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography
                      variant="body1"
                      sx={{
                        color: (theme) => theme.palette.text.primar,
                      }}
                    >
                      {column.title}
                    </Typography>
                    {column?.columnInfo}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading || isFetching ? (
              <RenderTableSkeleton columns={columns} />
            ) : rows?.length ? (
              rows?.map((row, index) => (
                <RenderTableRows
                  row={row}
                  key={index}
                  keyProp={keyProp}
                  index={index}
                  rowClick={rowClick}
                  columns={columns}
                  hidePagination={hidePagination}
                  rows={rows}
                  startIndex={(page - 1) * perPage}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="100%"
                  sx={{
                    border: 0,
                    width: '100%',
                    textAlign: 'center',
                    py: 7,
                  }}
                ></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!hidePagination && (
        <CustomPagination rowPerPageArray={rowPerPageArray} total={total} />
      )}
    </Box>
  );
}

TableWrapper.propTypes = {
  rows: PropTypes.array,
  total: PropTypes.number,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  pagination: PropTypes.object,
  keyProp: PropTypes.string,
  hidePagination: PropTypes.bool,
  rowPerPageArray: PropTypes.arrayOf(PropTypes.number),
  rowClick: PropTypes.any,
  isInlineOptionUpdating: PropTypes.bool,
  filterComponents: PropTypes.array,
};

RenderTableRows.propTypes = {
  row: PropTypes.object,
  keyProp: PropTypes.any,
  index: PropTypes.number,
  rowClick: PropTypes.func,
  columns: PropTypes.array,
  hidePagination: PropTypes.bool,
  rows: PropTypes.array,
  startIndex: PropTypes.number,
};

export default TableWrapper;
