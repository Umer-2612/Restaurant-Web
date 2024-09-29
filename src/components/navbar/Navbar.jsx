import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import PTFullLogo from './../../../src/assets/brand-image/punjabi-touch-cropped.png';

// Tabs constant for easy maintenance
const TABS = [
  { title: 'Home', path: '/home' },
  { title: 'Menu', path: '/menu' },
  { title: 'Reservation', path: '/reservation' },
  { title: 'About Us', path: '/about-us' },
  { title: 'Contact Us', path: '/contact-us' },
];

// Logo component for reuse
const Logo = ({ sx }) => (
  <Stack height={70} sx={sx}>
    <img
      src={PTFullLogo}
      alt="Punjabi Touch logo"
      height="100%"
      width="100%"
      aria-label="Punjabi Touch Logo"
    />
  </Stack>
);

Logo.propTypes = {
  sx: PropTypes.object,
};

// MenuTabs component for the desktop view
const MenuTabs = ({ navigate, activeMenu = '' }) => (
  <Stack
    direction="row"
    gap={4}
    sx={{
      flexGrow: 1,
      display: { xs: 'none', md: 'flex' },
      transform: { xs: 'none', lg: 'translate(-50%, -50%)' },
    }}
    justifyContent="center"
    position={{ xs: 'static', lg: 'absolute' }}
    left="50%"
    top="50%"
  >
    {TABS.map((tab) => (
      <Typography
        key={tab?.title}
        variant="body1"
        fontWeight={600}
        sx={{
          'cursor': 'pointer',
          'color': (theme) =>
            activeMenu === tab?.path ? theme.palette.primary.main : 'inherit',
          '&:hover': {
            color: (theme) => theme.palette.primary.main,
          },
        }}
        onClick={() => navigate(tab?.path)}
      >
        {tab?.title}
      </Typography>
    ))}
  </Stack>
);

MenuTabs.propTypes = {
  navigate: PropTypes.func,
  activeMenu: PropTypes.string,
};

// MobileMenu component for rendering tabs in a menu for mobile view
const MobileMenu = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  navigate,
  activeMenu = '',
}) => (
  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      size="large"
      aria-label="menu button"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleOpenNavMenu}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{ display: { xs: 'block', md: 'none' } }}
    >
      {TABS.map((tab) => (
        <MenuItem
          key={tab?.title}
          onClick={() => {
            navigate(tab?.path);
            handleCloseNavMenu();
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: (theme) =>
                activeMenu === tab?.path
                  ? theme.palette.primary.main
                  : 'inherit',
            }}
          >
            {tab?.title}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  </Box>
);

MobileMenu.propTypes = {
  anchorElNav: PropTypes.any,
  handleOpenNavMenu: PropTypes.func,
  handleCloseNavMenu: PropTypes.func,
  navigate: PropTypes.func,
  activeMenu: PropTypes.string,
};

// Main Navbar component
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const activeMenu = location.pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: (theme) => theme.palette.other.bgColor }}
      elevation={0}
    >
      <Grid
        container
        width="100%"
        justifyContent="center"
        px={2}
        py={1}
        position="relative"
      >
        <Grid size={{ xs: 12, md: 11 }}>
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            sx={{
              justifyContent: 'space-between',
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {/* Logo for laptop display */}
            <Logo
              sx={{
                display: { xs: 'none', md: 'flex' },
                aspectRatio: '789 / 241',
              }}
            />

            {/* Menu button for mobile display */}
            <MobileMenu
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
              navigate={navigate}
              activeMenu={activeMenu}
            />

            {/* Logo for mobile display */}
            <Stack
              flexGrow={1}
              direction="row"
              position="relative"
              display={{ xs: 'flex', md: 'none' }}
            >
              <Logo sx={{ aspectRatio: '789 / 241' }} />
            </Stack>

            {/* Centered menu tabs for laptop display */}
            <MenuTabs navigate={navigate} activeMenu={activeMenu} />

            {/* User avatar */}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Ayushya Patel"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    bgcolor: (theme) => theme.palette.primary.main,
                  }}
                />
              </IconButton>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;
