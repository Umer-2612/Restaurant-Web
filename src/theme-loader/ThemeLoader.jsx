import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { themeSelector } from '../store/theme';

export default function ThemeLoader(props) {
  const themeColor = useSelector(themeSelector);
  // const theme = responsiveFontSizes(createTheme(themeColor));
  const theme = createTheme(themeColor);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

ThemeLoader.propTypes = {
  children: PropTypes.element,
};
