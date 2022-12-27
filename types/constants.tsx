import { FAQ, Page, Trait } from "./interfaces";
export const STARKPILL_CONTRACT_ADDRESS =
	"0x05ef092a31619faa63bf317bbb636bfbba86baf8e0e3e8d384ee764f2904e5dd";
export const STARKETH_CONTRACT_ADDRESS =
	"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const MINTSQUARE_BASE_URL = "https://api.mintsquare.io/v0/";
export const NETWORK_FOR_API = "starknet-testnet";
export const PAGES: Page[] = [
	{
		title: "about",
		link: "",
		isActive: true,
	},
	{
		title: "faq",
		link: "",
		isActive: true,
	},
	{
		title: "cabinet",
		link: "",
		isActive: true,
	},
];
const LINK_HASH = "YUOO4tIjNdw82NlYv3reVJ4pQJw7uZFkm0LKKVdLSEA";
const FACE_TRAIT_LINK = "https://arweave.net/" + LINK_HASH + "/PillIngredient/";
export const FACE_TRAITS: Trait[] = [
	{
		id: 0,
		name: "None",
		link: FACE_TRAIT_LINK + "ing_000.png",
	},
	{
		id: 1,
		name: "Briq",
		link: FACE_TRAIT_LINK + "ing_001.png",
	},
	{
		id: 2,
		name: "Braavos",
		link: FACE_TRAIT_LINK + "ing_002.png",
	},
	{
		id: 3,
		name: "Orbiter",
		link: FACE_TRAIT_LINK + "ing_003.png",
	},
	{
		id: 4,
		name: "ChainLink Cap",
		link: FACE_TRAIT_LINK + "ing_004.png",
	},
	{
		id: 5,
		name: "Guthmann",
		link: FACE_TRAIT_LINK + "ing_005.png",
	},
	{
		id: 6,
		name: "Kitsune Mask",
		link: FACE_TRAIT_LINK + "ing_006.png",
	},
	{
		id: 7,
		name: "Wassie Face",
		link: FACE_TRAIT_LINK + "ing_007.png",
	},
	{
		id: 8,
		name: "Wassie Cone",
		link: FACE_TRAIT_LINK + "ing_008.png",
	},
	{
		id: 9,
		name: "Kabuto Helmet",
		link: FACE_TRAIT_LINK + "ing_009.png",
	},
	{
		id: 10,
		name: "Cairo Cap",
		link: FACE_TRAIT_LINK + "ing_010.png",
	},
];
const BACKGROUND_LINK =
	"https://arweave.net/" + LINK_HASH + "/PillBackground/bg_";
export const BACKGROUND: Trait[] = [
	{
		id: 0,
		name: "White",
		link: BACKGROUND_LINK + "000.png",
	},
	{
		id: 1,
		name: "Yellow",
		link: BACKGROUND_LINK + "001.png",
	},
	{
		id: 2,
		name: "Pink",
		link: BACKGROUND_LINK + "002.png",
	},
	{
		id: 3,
		name: "Purple",
		link: BACKGROUND_LINK + "003.png",
	},
	{
		id: 4,
		name: "Cyan",
		link: BACKGROUND_LINK + "004.png",
	},
	{
		id: 5,
		name: "Green",
		link: BACKGROUND_LINK + "005.png",
	},
	{
		id: 6,
		name: "Aquarius Sky Vaporwave",
		link: BACKGROUND_LINK + "006.png",
	},
	{
		id: 7,
		name: "Galaxy Oil Painting",
		link: BACKGROUND_LINK + "007.png",
	},
	{
		id: 8,
		name: "Rocket",
		link: BACKGROUND_LINK + "008.png",
	},
	{
		id: 9,
		name: "Cloudy Kingdom",
		link: BACKGROUND_LINK + "009.png",
	},
	{
		id: 10,
		name: "Training Grounds",
		link: BACKGROUND_LINK + "010.png",
	},
	{
		id: 11,
		name: "Medicine Cabinet",
		link: BACKGROUND_LINK + "011.png",
	},
	{
		id: 12,
		name: "Night Sky",
		link: BACKGROUND_LINK + "012.png",
	},
	{
		id: 13,
		name: "Violet Swirl",
		link: BACKGROUND_LINK + "013.png",
	},
];
export const FAQ_QUESTIONS: FAQ[] = [
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
];
