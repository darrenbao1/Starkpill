import { gql } from "@apollo/client";
import { CollabProject, FAQ, Page, Trait } from "./interfaces";
export const IS_TESTNET = true;
export const STARKPILL_CONTRACT_ADDRESS =
	"0x05ef092a31619faa63bf317bbb636bfbba86baf8e0e3e8d384ee764f2904e5dd";
export const STARKETH_CONTRACT_ADDRESS =
	"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
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
		title: "Leaderboard",
		link: "/cabinet",
		isActive: true,
	},
	{
		title: "Redeem",
		link: "/redemption",
		isActive: true,
		isBeta: true,
	},
	// {
	// 	title: "Snakes",
	// 	link: "/snakes",
	// 	isActive: true,
	// 	isBeta: true,
	// },
];
export const USERPAGES: Page[] = [
	{
		title: "Cabinet",
		link: "/mypills",
		isActive: true,
		paramName: "?walletAddress=",
	},
];

export const STARKPILL_API_ENDPOINT =
	"https://orca-app-c3df4.ondigitalocean.app/starkpill-api2/graphql";
const LINK_HASH = "v61bKgMreylGfDMjffAhrXvHv9TK-Fi18V4U8j-9Q5I";
export const IMAGE_ENDPOINT =
	"https://arweave.net/" + LINK_HASH + "/TestPill/pill_";
const FACE_TRAIT_LINK = "https://arweave.net/" + LINK_HASH + "/PillIngredient/";
const MKT_FACE_TRAIT_LINK =
	"https://arweave.net/" + LINK_HASH + "/PillIngredient/MktView/";
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
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_001.png",
	},
	{
		id: 2,
		name: "Braavos",
		link: FACE_TRAIT_LINK + "ing_002.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_002.png",
	},
	{
		id: 3,
		name: "Orbiter",
		link: FACE_TRAIT_LINK + "ing_003.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_003.png",
	},
	{
		id: 4,
		name: "ChainLink Cap",
		link: FACE_TRAIT_LINK + "ing_004.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_004.png",
	},
	{
		id: 5,
		name: "Guthmann",
		link: FACE_TRAIT_LINK + "ing_005.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_005.png",
	},
	{
		id: 6,
		name: "Kitsune Mask",
		link: FACE_TRAIT_LINK + "ing_006.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_006.png",
	},
	{
		id: 7,
		name: "Wassie Face",
		link: FACE_TRAIT_LINK + "ing_007.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_007.png",
	},
	{
		id: 8,
		name: "Wassie Cone",
		link: FACE_TRAIT_LINK + "ing_008.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_008.png",
	},
	{
		id: 9,
		name: "Kabuto Helmet",
		link: FACE_TRAIT_LINK + "ing_009.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_009.png",
	},
	{
		id: 10,
		name: "Cairo Cap",
		link: FACE_TRAIT_LINK + "ing_010.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_010.png",
	},
	{
		id: 11,
		name: "Bunny Plush",
		link: FACE_TRAIT_LINK + "ing_011.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_011.png",

		premiumPrice: 0.001,
	},
	{
		id: 12,
		name: "Cartridge",
		link: FACE_TRAIT_LINK + "ing_012.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_012.png",
		premiumPrice: 0.002,
	},
	{
		id: 13,
		name: "Mfers",
		link: FACE_TRAIT_LINK + "ing_013.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_013.png",
	},
	{
		id: 14,
		name: "Braavos Titan",
		link: FACE_TRAIT_LINK + "ing_014.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_014.png",
		premiumPrice: 0.002,
	},
	{
		id: 15,
		name: "Braavos Archer",
		link: FACE_TRAIT_LINK + "ing_015.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_015.png",
		premiumPrice: 0.002,
	},
	{
		id: 16,
		name: "Braavos Wizard",
		link: FACE_TRAIT_LINK + "ing_016.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_016.png",
		premiumPrice: 0.002,
	},
	{
		id: 17,
		name: "zkSnails",
		link: FACE_TRAIT_LINK + "ing_017.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_017.png",
	},
	{
		id: 18,
		name: "(3,3)Face",
		link: FACE_TRAIT_LINK + "ing_018.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_018.png",
	},
	{
		id: 19,
		name: "Aviators",
		link: FACE_TRAIT_LINK + "ing_019.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_019.png",
	},
	{
		id: 20,
		name: "Banteg Hat",
		link: FACE_TRAIT_LINK + "ing_020.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_020.png",
	},
	{
		id: 21,
		name: "Pepe",
		link: FACE_TRAIT_LINK + "ing_021.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_021.png",
	},
	{
		id: 22,
		name: "Pepe Smile",
		link: FACE_TRAIT_LINK + "ing_022.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_022.png",
	},
	{
		id: 23,
		name: "Pepe Smug",
		link: FACE_TRAIT_LINK + "ing_023.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_023.png",
	},
	{
		id: 24,
		name: "Peepo Smile",
		link: FACE_TRAIT_LINK + "ing_024.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_024.png",
	},
	{
		id: 25,
		name: "Wojak",
		link: FACE_TRAIT_LINK + "ing_025.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_025.png",
	},
	{
		id: 26,
		name: "Wojak Big Brain",
		link: FACE_TRAIT_LINK + "ing_026.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_026.png",
	},
	{
		id: 27,
		name: "Wojak Cope",
		link: FACE_TRAIT_LINK + "ing_027.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_027.png",
	},
	{
		id: 28,
		name: "Wojak Doomer",
		link: FACE_TRAIT_LINK + "ing_028.png",
		marketViewLink: MKT_FACE_TRAIT_LINK + "ing_028.png",
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
		question: "What is Leaderboard?",
		answer:
			"All minted Starkpills are displayed in our leaderboard page as a neat collection for people to see all the unique Starkpills minted.",
	},
	{
		question: "Can I add my own traits to the current offerings?",
		answer:
			"Yes! But subject to certain terms and conditions. If you’re interested with working with us, please reach out to 211lp@seraphlabs.io or @211lp on Twitter.",
	},
];

//gql queries
export const GET_VOTING_POWER_QUERY = gql`
	query User($address: String!) {
		user(address: $address) {
			getVotingPower
		}
	}
`;

const GET_ALL_TOKENS_HIGHEST_PRICE = gql`
	query AllTokens($skip: Int, $first: Int) {
		allTokens(skip: $skip, first: $first) {
			id
			owner {
				address
			}
			metadata {
				mintPrice
				imageUrl
				fame
			}
		}
	}
`;
const GET_ALL_TOKENS_HIGHEST_FAME = gql`
	query AllTokensByHighestFame($skip: Int, $first: Int) {
		allTokensByHighestFame(skip: $skip, first: $first) {
			id
			owner {
				address
			}
			metadata {
				mintPrice
				imageUrl
				fame
			}
		}
	}
`;
const GET_ALL_TOKENS_LATEST = gql`
	query AllTokensByLatest($skip: Int, $first: Int) {
		allTokensByLatest(skip: $skip, first: $first) {
			id
			owner {
				address
			}
			metadata {
				mintPrice
				imageUrl
				fame
			}
		}
	}
`;
const GET_ALL_TOKENS_LOWEST_FAME = gql`
	query AllTokenByLowestFame($skip: Int, $first: Int) {
		allTokenByLowestFame(skip: $skip, first: $first) {
			id
			owner {
				address
			}
			metadata {
				mintPrice
				imageUrl
				fame
			}
		}
	}
`;
export const GET_USER_TOKENS = gql`
	query Tokens($address: String!) {
		user(address: $address) {
			tokens {
				id
				ingredient
				background
				owner {
					address
				}
				metadata {
					imageUrl
					mintPrice
					fame
				}
			}
		}
	}
`;
export const GET_PHARMACY_DATA = gql`
	query GetPharmacyData {
		getPharmacyData {
			amount_left
			index
			startAmount
			typeIndex
		}
	}
`;
export const GET_TOKEN_BY_ID = gql`
	query Token($tokenId: Int!) {
		token(tokenId: $tokenId) {
			id
			ingredient
			background
			owner {
				address
			}
			metadata {
				imageUrl
				mintPrice
				fame
			}
		}
	}
`;

export const DROPDOWN_MENU_ITEMS = [
	{
		id: 0,
		label: "Highest Price",
		query: GET_ALL_TOKENS_HIGHEST_PRICE,
		keyName: "allTokens",
	},
	{
		id: 1,
		label: "Highest Fame",
		query: GET_ALL_TOKENS_HIGHEST_FAME,
		keyName: "allTokensByHighestFame",
	},
	{
		id: 2,
		label: "Lowest Fame",
		query: GET_ALL_TOKENS_LOWEST_FAME,
		keyName: "allTokenByLowestFame",
	},
	{
		id: 3,
		label: "Latest",
		query: GET_ALL_TOKENS_LATEST,
		keyName: "allTokensByLatest",
	},
];
//TODO match redeemId to trait id
export const COLLAB_PROJECTS: CollabProject[] = [
	{
		contract_address: "0xf4A7C105CFdc6aaBe9AE65bDF2d0dF0A567A7aDE",
		name: "ARC Stellar",
		imageUrl: "/png/arcImage.png",
		redeemId: 2,
	},
	{
		contract_address: "0x1D20A51F088492A0f1C57f047A9e30c9aB5C07Ea",
		name: "WASSIE",
		imageUrl: "/png/wassies.png",
		redeemId: 3,
	},
	{
		contract_address: "0xABCDB5710B88f456fED1e99025379e2969F29610",
		name: "Radbro",
		imageUrl: "/png/Radbro.png",
		redeemId: 4,
	},
	{
		contract_address: "0x5Af0D9827E0c53E4799BB226655A1de152A425a5",
		name: "Milady",
		imageUrl: "/png/Milady.png",
		redeemId: 5,
	},
];
export const handleScrollToTop = (ref: React.RefObject<any>) => {
	if (ref.current) {
		ref.current.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}
};
