export type ThemeType = typeof lightTheme;

// Grey
const grey = {
  400: '#BABABA',
  500: '#949494',
  600: '#777777',
  700: '#555555',
  800: '#303030',
  900: '#0C1515',
};

// bg

const bg = {
  base: '#fefefe',
  grey: '#f2f2f2',
  line: '#dcdcdc',
  dim: '#00000080',
  elevated: '#fbfbfb',
  orange: '#fcf0e8',
  mint10: '#e9faf7',
  mint20: '#B3F0E8',
  mint30: '#2FC4BB',
};

// primary
const primary = {
  900: '#008899',
  800: '#359d9e',
  700: '#2fc4bb',
  600: '#87e4da',
  500: '#b3f0e8',
};

// orange
const orange = {
  900: '#e34400',
  700: '#ff9366',
};

// icon

const icon = {
  mint10: '#FEFEFE',
  mint20: '#B3F0E8',
  mint60: '#005f6c',
  orange10: '#fffcfc',
  orange50: '#ff6f32',
  white: '#fefefe',
};

const colors = {
  grey,
  bg,
  primary,
  orange,
  icon,
};

const fonts = {
  spoqa: {
    thin: 'SpoqaThin',
    light: 'SpoqaLight',
    regular: 'SpoqaRegular',
    medium: 'SpoqaMedium',
    bold: 'SpoqaBold',
  },
};

export const lightTheme = {
  colors,
  fonts,
};

export default lightTheme as ThemeType;
