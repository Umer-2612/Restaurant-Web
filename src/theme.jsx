import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#800020", // Deep burgundy
    },
    secondary: {
      main: "#d4af37", // Champagne gold
    },
    background: {
      default: "#f5f5dc", // Soft cream
    },
    text: {
      primary: "#333333", // Charcoal gray
      secondary: "#000080", // Deep navy
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
      fontSize: "1.5rem",
      letterSpacing: "0.1rem",
    },
    button: {
      textTransform: "none", // Preserve case for buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#800020", // Deep burgundy
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#600018", // Darker burgundy
          },
        },
        outlinedPrimary: {
          borderColor: "#d4af37", // Champagne gold
          color: "#d4af37",
          "&:hover": {
            borderColor: "#b89a2d", // Darker champagne gold
            color: "#b89a2d",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Remove shadow for a cleaner look
        },
      },
    },
  },
});

export default theme;
