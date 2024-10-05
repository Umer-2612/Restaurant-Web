import React from 'react';

import { Stack, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

// Styles for selected and unselected chips
const chipStyles = {
  'margin': '5px',
  'fontWeight': 'bold',
  '&.MuiChip-clickable': {
    border: '2px solid #0B3D91',
  },
  '&.MuiChip-clickableColorPrimary': {
    'color': '#fff',
    'backgroundColor': '#0B3D91',
    '&:hover': {
      backgroundColor: '#0A3578',
    },
  },
};

const MenuFilter = ({ categories, onCategoryChange }) => {
  const [searchParams] = useSearchParams();
  const handleChipClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category.id);
    }
  };

  return (
    <Stack direction="row" justifyContent="center" flexWrap="wrap" spacing={2}>
      {categories.map((category) => (
        <Chip
          key={category?.id}
          label={category?.name}
          color={
            searchParams.get('category') === category.id ? 'primary' : 'default'
          }
          clickable
          sx={chipStyles}
          onClick={() => handleChipClick(category)}
        />
      ))}
    </Stack>
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
