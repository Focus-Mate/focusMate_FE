import { ThemeType } from "./lightTheme";

// Grey
const grey = {
	400: "#999999",
	500: "#B9B9B9",
	600: "#B8B8B8",
	700: "#DCDCDC",
	800: "#F5F5F5",
	900: "#F6F6F6",
};

// bg

const bg = {
	base: "#0c1515",
	grey: "#212424",
	line: "#666666",
	dim: "#00000080",
	elevated: "#404040",
	orange: "#d66d56",
	mint10: "#1e4247",
	mint20: "#359d9f",
	mint30: "#87E4DB",
};

// primary
const primary = {
	900: "#b3f0e8",
	800: "#87e4da",
	700: "#2fc4bb",
	600: "#359d9e",
	500: "#018a93",
};

// orange
const orange = {
	900: "#ffac88",
	700: "#ffa47c",
};

// icon

const icon = {
	mint10: "#008b99",
	mint20: "#005d5d",
	mint60: "#87e4dc",
	orange10: "#df5f42",
	orange50: "#ffe5da",
	white: "#f2f2f2",
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
		thin: "SpoqaThin",
		light: "SpoqaLight",
		regular: "SpoqaRegular",
		medium: "SpoqaMedium",
		bold: "SpoqaBold",
	},
};

export const darkTheme = {
	colors,
	fonts,
};

export default darkTheme as ThemeType;
