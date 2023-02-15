export type ThemeType = typeof theme;

// Grey
const grey = {
	400: "#BABABA",
	500: "#949494",
	600: "#777777",
	700: "#555555",
	800: "#303030",
	900: "#111111",
};

// bg

const bg = {
	base: "#ffffff",
	grey: "#f6f6f6",
	line: "#dbdbdb",
	dim: "#00000080",
	elevated: "#fbfbfb",
	orange: "#fcf0e8",
	mint10: "#e9faf7",
	mint20: "#b3f0e9",
	mint30: "#2fc4bc",
};

// primary
const primary = {
	900: "#018a93",
	800: "#359d9e",
	700: "#2fc4bb",
	600: "#87e4da",
	500: "#b3f0e8",
};

// orange
const orange = {
	900: "#e34400",
	700: "#ff9366",
};

// icon

const icon = {
	mint10: "#fbffff",
	mint20: "#b2f2f2",
	mint60: "#005f6c",
	orange10: "#fffcfc",
	orange50: "#ff6f32",
};

const colors = {
	grey,
	bg,
	primary,
	orange,
	icon,
};

export const theme = {
	colors,
};

export default theme;
