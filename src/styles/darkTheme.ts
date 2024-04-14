import { fontsTheme } from './fontsTheme';
import { ThemeType } from './lightTheme';

// Grey
const grey = {
  400: '#999999',
  500: '#BABABA',
  600: '#BABABA',
  700: '#DCDCDC',
  800: '#F2F2F2',
  900: '#F2F2F2',
};

// bg

const bg = {
  base: '#0c1515',
  grey: '#303030',
  line: '#555555',
  dim: '#00000080',
  elevated: '#555555',
  orange: '#DF5F42',
  mint10: '#008B99',
  mint20: '#359D9E',
  mint30: '#87E4DA',
};

// primary
const primary = {
  900: '#b3f0e8',
  800: '#87e4da',
  700: '#2fc4bb',
  600: '#359d9e',
  500: '#008899',
};

// orange
const orange = {
  900: '#ffac88',
  700: '#ffa47c',
};

// icon

const icon = {
  mint10: '#008b99',
  mint20: '#005F6C',
  mint60: '#87E4DA',
  orange10: '#df5f42',
  orange50: '#ffe5da',
  white: '#f2f2f2',
};

const colors = {
  grey,
  bg,
  primary,
  orange,
  icon,
};

export const darkTheme = {
  colors,
  fonts: fontsTheme.fonts,
  typography: fontsTheme.typography,
};

export default darkTheme as ThemeType;
