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
		link: "/about",
		isActive: true,
	},
	{
		title: "cabinet",
		link: "/cabinet",
		isActive: true,
	},
];
export const USERPAGES: Page[] = [
	{
		title: "pills",
		link: "/mypills",
		isActive: true,
		paramName: "?walletAddress=",
	},
];
const STARKPILL_API_ENDPOINT =
	"https://orca-app-c3df4.ondigitalocean.app/starkpill-api2/graphql";
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
		question: "What's Starkpilled?",
		answer:
			"Starkpilled is an SFT (Semi-Fungible Token) collection of digital avatars for people to celebrate to the StarkNet Ecosystem and participate in the SFT movement.",
	},
	{
		question: "What's the vision?",
		answer:
			"First, we want to showcase a better way to tokenize digital collectibles. Second, we’d like to offer a different perspective on valuing PFP collections - currently rarity is tied to the whole RNG’d PFP work of art eg. you value CryptoPunk#2391 as it is. With Starkpilled the idea is to value traits over the whole, so you can have a digital avatar that you can identify with more meaningfully.",
	},
	{
		question: "SFTs?",
		answer:
			"Compared to traditional NFT collections that are of the ERC-721 token standard, Starkpills are ERC-2114s’ a Seraph Labs tweak of the novel ERC-3525 developed by Solv Protocol. In short, SFTs are dynamic “NFTs” that are able to be programmed and “equip” other “NFTs”.",
	},
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
