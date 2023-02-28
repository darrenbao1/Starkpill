import { FAQ, Page, Trait } from "./interfaces";
export const IS_TESTNET = true;
export const STARKPILL_CONTRACT_ADDRESS =
	"0x05ef092a31619faa63bf317bbb636bfbba86baf8e0e3e8d384ee764f2904e5dd";
export const STARKETH_CONTRACT_ADDRESS =
	"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const MINTSQUARE_BASE_URL = "https://api.mintsquare.io/v0/";
export const NETWORK_FOR_API = IS_TESTNET
	? "starknet-testnet"
	: "starknet-mainnet";
export const PAGES: Page[] = [
	{
		title: "About",
		link: "/about",
		isActive: true,
	},
	{
		title: "Cabinet",
		link: "/cabinet",
		isActive: true,
	},
];
export const USERPAGES: Page[] = [
	{
		title: "Pills",
		link: "/mypills",
		isActive: true,
		paramName: "?walletAddress=",
	},
];

const STARKPILL_API_ENDPOINT =
	"https://orca-app-c3df4.ondigitalocean.app/starkpill-api2/graphql";
const LINK_HASH = "AMMydFUcSQqFctiUlj565EKdGKXF2IiSkCKTQEHBVrY";
export const IMAGE_ENDPOINT =
	"https://arweave.net/" + LINK_HASH + "/TestPill/pill_";
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
	{
		id: 11,
		name: "Bunny Plush",
		link: FACE_TRAIT_LINK + "ing_011.png",
		premiumPrice: 0.001,
	},
	{
		id: 12,
		name: "Cartridge",
		link: FACE_TRAIT_LINK + "ing_012.png",
		premiumPrice: 0.002,
	},
	{
		id: 13,
		name: "Mfers",
		link: FACE_TRAIT_LINK + "ing_013.png",
	},
	{
		id: 14,
		name: "Braavos Titan",
		link: FACE_TRAIT_LINK + "ing_014.png",
		premiumPrice: 0.002,
	},
	{
		id: 15,
		name: "Braavos Archer",
		link: FACE_TRAIT_LINK + "ing_015.png",
		premiumPrice: 0.002,
	},
	{
		id: 16,
		name: "Braavos Wizard",
		link: FACE_TRAIT_LINK + "ing_016.png",
		premiumPrice: 0.002,
	},
	{
		id: 17,
		name: "zkSnails",
		link: FACE_TRAIT_LINK + "ing_017.png",
	},
	{
		id: 18,
		name: "(3,3)Face",
		link: FACE_TRAIT_LINK + "ing_018.png",
	},
	{
		id: 19,
		name: "Aviators",
		link: FACE_TRAIT_LINK + "ing_019.png",
	},
	{
		id: 20,
		name: "Banteg Hat",
		link: FACE_TRAIT_LINK + "ing_020.png",
	},
	{
		id: 21,
		name: "Pepe",
		link: FACE_TRAIT_LINK + "ing_021.png",
	},
	{
		id: 22,
		name: "Pepe Smile",
		link: FACE_TRAIT_LINK + "ing_022.png",
	},
	{
		id: 23,
		name: "Pepe Smug",
		link: FACE_TRAIT_LINK + "ing_023.png",
	},
	{
		id: 24,
		name: "Peepo Smile",
		link: FACE_TRAIT_LINK + "ing_024.png",
	},
	{
		id: 25,
		name: "Wojak",
		link: FACE_TRAIT_LINK + "ing_025.png",
	},
	{
		id: 26,
		name: "Wojak Big Brain",
		link: FACE_TRAIT_LINK + "ing_026.png",
	},
	{
		id: 27,
		name: "Wojak Cope",
		link: FACE_TRAIT_LINK + "ing_027.png",
	},
	{
		id: 28,
		name: "Wojak Doomer",
		link: FACE_TRAIT_LINK + "ing_028.png",
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
	{
		id: 14,
		name: "Train Tracks",
		link: BACKGROUND_LINK + "014.png",
		premiumPrice: 0.001,
	},
	{
		id: 15,
		name: "Cartridge",
		link: BACKGROUND_LINK + "015.png",
	},
	{
		id: 16,
		name: "Eastern Palace",
		link: BACKGROUND_LINK + "016.png",
	},
	{
		id: 17,
		name: "Fortress City",
		link: BACKGROUND_LINK + "017.png",
	},
	{
		id: 18,
		name: "Impenetrable Defense",
		link: BACKGROUND_LINK + "018.png",
	},
];
export const FAQ_QUESTIONS: FAQ[] = [
	{
		question: "What can I do with my Starkpills?",
		answer:
			"Think of Starkpills as your digital avatar that you can personalize to your liking with 2 points of customization - facial trait and background. We will continuously release new traits and partner with projects to offer limited edition traits.",
	},
	{
		question: "Can I trade my traits?",
		answer:
			"Yes, you can! Because Starkpills are ERC-2114 SFTs, think of the default Starkpill as the base image and the other 2 traits as NFTs that it equips. You will be able to unequip traits and equip new ones acquired through trading and special events.",
	},
	{
		question: "What’s the cabinet?",
		answer:
			"All minted Starkpills are displayed in our cabinet page as a neat collection for people to see all the unique Starkpills minted.",
	},
	{
		question: "Can I add my own traits to the current offerings?",
		answer:
			"Yes! But subject to certain terms and conditions. If you’re interested with working with us, please reach out to 211lp@seraphlabs.io or @211lp on Twitter.",
	},
];
