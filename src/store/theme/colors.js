export const common = {
  white: '#ffffff',
  black: '#000000',
};

export const primaryColor = {
  50: '#fff2ec',
  100: '#ffd8c3',
  200: '#ffc5a7',
  300: '#feab7e',
  400: '#fe9a65',
  500: '#fe813f',
  600: '#e77539',
  700: '#b45c2d',
  800: '#8c4723',
  900: '#6b361a',
  A100: '#282c3f26',
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
  error: {
    main: '#FE4040',
    light: '#FEEAEA',
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
    secondary: '#575960',
    disabled: '#C0C5D8',
  },
  background: {
    paper: common.white,
  },
  other: {
    border: '#D4D4D4',
    bgColor: '#F6F7FC',
    ppc: '#725CDF',
    ggc: '#23C55E',
    ooc: '#FE813F',
    hover: '#f2f2f2',
    buttonBg: '#FFFCFA',
  },
  primaryColor,
  common,
  type: 'Light',
};

export const DARK = {};
