export interface Theme<ThemeType> {
	theme: ThemeType;
}
export interface AppTheme {
	name: string;
	primaryColor: string;
	primaryColorHover: string;
	bgColor: string;
	whiteBgColor: string;
	blackText: string;
	whiteText: string;
}
export const StarkpillTheme = {
	name: "Starkpill theme",
	primaryColor: "#FF4F0A",
	primaryColorHover: "#fe7641",
	bgColor: "#29296E",
	whiteBgColor: "#f7f7f7",
	blackText: "black",
	whiteText: "white",
};
