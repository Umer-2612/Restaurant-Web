import React from 'react';

import { Stack, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const CHIP_STYLE = (theme, searchParams, category) => {
  return {
    'px': 1,
    'background':
      searchParams.get('category') === category.id
        ? `linear-gradient(60deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
        : theme.palette.background.paper,
    'color':
      searchParams.get('category') === category.id
        ? theme.palette.common.white
        : theme.palette.text.primary,
    'transition': 'all 0.2s ease-in-out',
    'boxShadow':
      searchParams.get('category') === category.id
        ? '0px 4px 12px rgba(0, 0, 0, 0.2)'
        : 'none',
    'transform':
      searchParams.get('category') === category.id ? 'scale(1.02)' : 'scale(1)',
    '&:hover': {
      background: `linear-gradient(60deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      color: theme.palette.common.white,
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.25)',
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(1)',
    },
    'maxWidth': 150,
    'whiteSpace': 'nowrap',
    'textOverflow': 'ellipsis',
    'overflow': 'hidden', // Make sure overflow is hidden for the ellipsis to work
  };
};

const MenuFilter = ({ categories, onCategoryChange }) => {
  const [searchParams] = useSearchParams();
  const handleChipClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category.id);
    }
  };

  return (
    <Grid size={12}>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        width="100%"
      >
        {categories.map((category) => (
          <Chip
            key={category?.id}
            label={
              <Typography variant="body2" noWrap>
                {category?.name}
              </Typography>
            }
            color={
              searchParams.get('category') === category.id
                ? 'primary'
                : 'default'
            }
            clickable
            sx={(theme) => CHIP_STYLE(theme, searchParams, category)}
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
