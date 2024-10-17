const fontSize = 14; // px
const htmlFontSize = 16;
const coef = fontSize / 14;

// const fontSizeCalc = (expectedBodyFontSize) => {
//   return (14 / 16) * expectedBodyFontSize;
// };

export const pxToRem = (size) => `${(size / htmlFontSize) * coef}rem`;

export function themeTypography() {
  return {
    htmlFontSize,
    // fontSize: fontSizeCalc(fontSize),
    fontFamily: ['Inter'].join(','),
    h1: {
      fontWeight: 600,
      fontSize: pxToRem(40),
      lineHeight: pxToRem(60),
    },
    h2: {
      fontWeight: 500,
      fontSize: pxToRem(32),
      lineHeight: pxToRem(48),
    },
    bh2: {
      fontWeight: 600,
      fontSize: pxToRem(32),
      lineHeight: pxToRem(48),
    },
    h3: {
      fontWeight: 600,
      fontSize: pxToRem(24),
      lineHeight: pxToRem(36),
    },
    bh3: {
      fontWeight: 800,
      fontSize: pxToRem(34),
      lineHeight: pxToRem(36),
      letterSpacing: '0.1rem',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: pxToRem(24),
      lineHeight: pxToRem(36),
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: pxToRem(18),
      lineHeight: pxToRem(27),
    },
    body1: {
      fontWeight: 500,
      fontSize: pxToRem(16),
      lineHeight: pxToRem(24),
    },
    body2: {
      fontWeight: 400,
      fontSize: pxToRem(16),
      lineHeight: pxToRem(24),
    },
    body3: {
      fontWeight: 500,
      fontSize: pxToRem(14),
      lineHeight: pxToRem(21),
    },
    body4: {
      fontWeight: 400,
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
    },
    body5: {
      fontWeight: 500,
      fontSize: pxToRem(13),
      lineHeight: pxToRem(20),
    },
    body6: {
      fontWeight: 400,
      fontSize: pxToRem(13),
      lineHeight: pxToRem(20),
    },
  };
}
