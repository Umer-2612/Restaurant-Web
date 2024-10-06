import React, { useCallback } from 'react';

import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { PropTypes } from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import MenuList from './MenuList';

import { Logo } from 'components/navbar/Navbar';
import { pxToRem } from 'store/theme/typography';

const drawerWidth = 260;
const minWidth = 68;
const openedMixin = (theme) => ({
  'width': drawerWidth,
  'transition': theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  '& .MuiListItemText-root': {
    opacity: 1,
  },
  '& + button': {
    left: drawerWidth,
  },
});

const closedMixin = (theme) => ({
  'transition': theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  'width': minWidth,
  '& .MuiListItemText-root': {
    opacity: 0,
    overflow: 'hidden',
  },
  '& .MuiCollapse-wrapperInner': {
    maxHeight: '0px',
    opacity: 0,
  },

  '&:hover .MuiDrawer-paper': {
    'width': drawerWidth,
    '& .MuiListItemText-root': {
      opacity: 1,
    },
    '& .MuiCollapse-wrapperInner': {
      maxHeight: '300px',
      opacity: 1,
    },
  },
  '&:hover + button': {
    left: drawerWidth,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  'width': drawerWidth,
  'whiteSpace': 'nowrap',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  '& .MuiCollapse-wrapperInner': {
    maxHeight: '1000px',
    opacity: 1,
    overflow: 'hidden',
    transition: theme.transitions.create(['max-height', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '& .MuiListItemText-root': {
    transitionDelay: '100ms',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default function SideBar({ open }) {
  const navigate = useNavigate();
  const currentRoute = useLocation();

  const handleClick = useCallback(() => {
    if (currentRoute.pathname !== '/admin/orders') {
      navigate('/admin/orders');
    }
  }, [currentRoute.pathname, navigate]);

  return (
    <StyledDrawer
      open={true}
      variant="permanent"
      PaperProps={{
        sx: {
          height: '100%',
          width: drawerWidth,
          borderRight: (theme) => `1px solid ${theme.palette.grey[200]}`,
        },
      }}
    >
      <Stack
        justifyContent={'space-between'}
        sx={{ maxHeight: '100%', height: '100%' }}
        p={pxToRem(12)}
      >
        <Stack rowGap={1}>
          <Stack
            ml={0.2}
            direction="row"
            width="100%"
            justifyContent="center"
            alignItems={'center'}
            overflow="hidden"
          >
            <Logo handleClick={handleClick} />
          </Stack>
          <MenuList />
        </Stack>
      </Stack>
    </StyledDrawer>
  );
}

SideBar.propTypes = {
  open: PropTypes.bool,
};
