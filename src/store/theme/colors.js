export const common = {
  white: '#ffffff',
  black: '#000000',
};

export const primaryColor = {
  50: '#ffe9ea',
  100: '#f9c7c9',
  200: '#f3a3a6',
  300: '#ed7f83',
  400: '#e75b60',
  500: '#E63946', // Appetizing Red
  600: '#cf3337',
  700: '#b7282c',
  800: '#9f1d21',
  900: '#871517',
  A100: '#fff2f0', // Soft transparency background
};

export const LIGHT = {
  primary: {
    main: primaryColor[500],
    light: primaryColor[300],
    dark: primaryColor[600],
    contrastText: common.white,
  },
  secondary: {
    main: '#575960',
    light: '#cdcdcf',
    dark: '#3c3e44',
    contrastText: common.white,
  },
  subColor: {
    main: '#FFCE00',
  },
  error: {
    main: '#FE4040',
    light: '#FEEAEA',
  },
  sectionBackground: {
    main: '#FFEFC6',
  },
  warning: {
    main: '#FF6F30',
    light: '#FEF0EA',
  },
  info: {
    main: '#4FB7F6',
    light: '#EBF7FF',
  },
  success: {
    main: '#23C55E',
    light: '#EBFFF2',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  },
  text: {
    primary: '#141415',
    secondary: '#696969',
    disabled: '#C0C5D8',
  },

  background: {
    paper: common.white,
  },
  other: {
    border: '#D4D4D4',
    bgColor: '#f8f8f8',
    ppc: '#725CDF',
    ggc: '#23C55E',
    ooc: '#FE813F',
    hover: '#f2f2f2',
    buttonBg: '#FFFCFA',
    mutedBlack: '#202020',
    carouselText: '#b42a2b',
    carouselName: '#595758',
  },
  primaryColor,
  common,
  type: 'Light',
};

export const DARK = {};
