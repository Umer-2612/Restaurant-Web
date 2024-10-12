import { createSlice } from '@reduxjs/toolkit';

import { DARK, LIGHT } from './colors';
import { themeTypography, pxToRem } from './typography';

const createThemeVariable = (mode) => {
  const isDark = mode === 'dark';
  const palettes = isDark ? DARK : LIGHT;

  return {
    palette: palettes,
    typography: themeTypography,
    spacing: (factor) => `${0.25 * factor}rem`,
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            cursor: 'pointer',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            fontSize: pxToRem(14),
            textTransform: 'none',
          },
        },
        variants: [
          // {
          //   props: { variant: 'contained', color: 'secondary' },
          //   style: {
          //     'background': palettes.text.secondary,
          //     '&:hover': {
          //       background: palettes.secondaryColor[300],
          //     },
          //   },
          // },
        ],
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: pxToRem(12),
            borderBottom: 0,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: palettes.icon,
          },
        },
      },
    },
  };
};

const initialState = {
  colors: createThemeVariable('light'),
  oldMode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    getInitialState: (state) => {
      // state.oldMode = JSON.parse(localStorage.getItem('themeMode'))?.length
      //   ? JSON.parse(localStorage.getItem('themeMode'))
      //   : 'light';
      // state.colors = createThemeVariable(
      //   JSON.parse(localStorage.getItem('themeMode')),
      //   true
      // );
      state.oldMode = 'light';
      state.colors = createThemeVariable('light', true);
      return state;
    },
    toggleTheme: (state) => {
      const newMode = state.oldMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', JSON.stringify(newMode));
      state.oldMode = JSON.parse(localStorage.getItem('themeMode'));
      state.colors = createThemeVariable(
        JSON.parse(localStorage.getItem('themeMode')),
        true
      );
      return state;
    },
  },
});

export const { toggleTheme, getInitialState } = themeSlice.actions;
export const themeModeSelector = (state) =>
  JSON.parse(localStorage.getItem('themeMode')) || state?.theme.oldMode;
export const themeSelector = (state) => state?.theme.colors;

const theme = themeSlice.reducer;
export default theme;
