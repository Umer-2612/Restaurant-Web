import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Typography } from "@mui/material";
import logo from "../../public/assets/logo.svg"; // Add your logo here

// Custom styles for the navbar
const NavbarContainer = styled(AppBar)({
  backgroundColor: "#f5f5dc", // Soft cream background
  color: "#800020", // Deep burgundy text
  borderBottom: "1px solid #e0e0e0", // Subtle bottom border
});

const Logo = styled("img")({
  height: "60px",
  marginRight: "20px",
});

const CenterNavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexGrow: 1,
  gap: "40px",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const RightButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: "#800020",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "1rem",
  "&:hover": {
    color: "#d4af37", // Champagne gold on hover
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const MobileMenuIcon = styled(IconButton)({
  display: "block",
  marginLeft: "auto",
});

const DrawerList = styled(Box)({
  width: 250,
  padding: "16px",
  backgroundColor: "#f5f5dc",
});

const DrawerLink = styled(Link)({
  display: "block",
  textDecoration: "none",
  color: "#800020",
  fontWeight: "500",
  marginBottom: "12px",
  fontSize: "1.1rem",
  "&:hover": {
    color: "#d4af37", // Champagne gold on hover
  },
});

const DrawerButton = styled(Button)({
  marginTop: "16px",
  width: "100%",
  "&:first-of-type": {
    marginBottom: "8px",
  },
});

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:950px)"); // Media query for mobile view

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <NavbarContainer position="static">
      <Toolbar>
        {/* Left Side: Logo */}
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Logo src={logo} alt="Punjabi Touch Logo" />
        </IconButton>

        {/* Center: Navigation Links */}
        <CenterNavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/reservation">Reservation</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </CenterNavLinks>

        {/* Right Side: Buttons */}
        <RightButtonGroup>
          <Button variant="contained" color="primary">
            Order Online
          </Button>
          <Button variant="outlined" color="secondary">
            Book a Reservation
          </Button>
        </RightButtonGroup>

        {/* Mobile Menu Icon */}
        {isMobile && (
          <MobileMenuIcon
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </MobileMenuIcon>
        )}

        {/* Mobile Menu Drawer */}
        <SwipeableDrawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
        >
          <DrawerList>
            <Typography
              variant="h6"
              sx={{ color: "#800020", marginBottom: "16px" }}
            >
              Menu
            </Typography>
            <DrawerLink to="/" onClick={handleDrawerToggle}>
              Home
            </DrawerLink>
            <DrawerLink to="/about" onClick={handleDrawerToggle}>
              About Us
            </DrawerLink>
            <DrawerLink to="/menu" onClick={handleDrawerToggle}>
              Menu
            </DrawerLink>
            <DrawerLink to="/reservation" onClick={handleDrawerToggle}>
              Reservation
            </DrawerLink>
            <DrawerLink to="/faq" onClick={handleDrawerToggle}>
              FAQ
            </DrawerLink>
            <DrawerLink to="/contact" onClick={handleDrawerToggle}>
              Contact Us
            </DrawerLink>
            <DrawerButton
              variant="contained"
              color="primary"
              onClick={handleDrawerToggle}
            >
              Order Online
            </DrawerButton>
            <DrawerButton
              variant="outlined"
              color="secondary"
              onClick={handleDrawerToggle}
            >
              Book a Reservation
            </DrawerButton>
          </DrawerList>
        </SwipeableDrawer>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
