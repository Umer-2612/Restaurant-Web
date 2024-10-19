import React from 'react';

import { Stack, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const CHIP_STYLE = (theme, searchParams, category) => {
  return {
    'px': 1,
    'border': `1px solid ${
      searchParams.get('category') === category?.id ||
      (!searchParams.get('category') && category?.name === 'All')
        ? theme.palette.other.border
        : theme.palette.other.border
    }`,
    'background':
      searchParams.get('category') === category?.id ||
      (!searchParams.get('category') && category?.name === 'All')
        ? theme.palette.primaryColor[50]
        : theme.palette.other.bgColor,
    'color':
      searchParams.get('category') === category?.id ||
      (!searchParams.get('category') && category?.name === 'All')
        ? // searchParams.get('category') === category.id
          theme.palette.primary.main
        : theme.palette.text.primary,
    'transition': 'all 0.2s ease-in-out',
    'borderRadius': 2,
    'transform':
      searchParams.get('category') === category?.id ||
      (!searchParams.get('category') && category?.name === 'All')
        ? 'scale(1.02)'
        : 'scale(1)',
    '&:hover': {
      background: theme.palette.primaryColor[50],
      boxShadow:
        'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      transform: 'scale(1.02)',
    },
    '&:active': {
      transform: 'scale(1)',
    },
    'maxWidth': 200,
    'whiteSpace': 'nowrap',
    'textOverflow': 'ellipsis',
    'overflow': 'hidden',
  };
};

const MenuFilter = ({ categories, onCategoryChange }) => {
  const [searchParams] = useSearchParams();

  const handleChipClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category?.id || null);
    }
  };

  const allCategory = { id: 'All', name: 'All' };
  const updatedCategories = [allCategory, ...categories];

  return (
    <Grid size={12}>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        width="100%"
      >
        {updatedCategories?.map((category) => (
          <Chip
            key={category?.id}
            label={
              <Typography variant="body2" noWrap>
                {category?.name}
              </Typography>
            }
            sx={(theme) => CHIP_STYLE(theme, searchParams, category)}
            clickable
            onClick={() => handleChipClick(category)}
          />
        ))}
      </Stack>
    </Grid>
  );
};

// Adding PropTypes for validation
MenuFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default MenuFilter;
