import { gql } from "@apollo/client";
import {
	BACKGROUND,
	FACE_TRAITS,
	GET_BACKPACK_TOKENS_BY_ADDRESS,
	GET_TOKEN_IMAGE_BY_ID,
	GET_VOTING_POWER_QUERY,
	STARKPILL_CONTRACT_ADDRESS,
	STARKPILL_SOCIAL_API_ENDPOINT,
} from "./constants";
import { Trait, decodedSignature } from "./interfaces";
import client from "../apollo-client";
import Web3 from "web3";
import BN from "bn.js";

export function shortenAddress(string: string) {
	if (string === undefined) return "unknown";
	return string.substring(0, 4) + "..." + string.substring(string.length - 4);
}

export function shortAddressForModal(string: string) {
	if (string === undefined) return "unknown";
	return string.substring(0, 23) + "..." + string.substring(string.length - 4);
}
export function convertToStandardWalletAddress(walletAddress: string) {
	return "0x" + walletAddress.substring(2).padStart(64, "0");
}

export async function getPharmacyData() {
	const GET_PHARMACY_DATA = gql`
		query GetPharmacyData {
			getPharmacyData {
				amount_left
				index
				startAmount
				typeIndex
			}
		}
	`;
	try {
		const result = await client.query({
			query: GET_PHARMACY_DATA,
		});
		return result.data.getPharmacyData;
	} catch (error) {
		console.error(error);
	}
}
export async function getUserBackPack(walletAddress: String) {
	const walletAddressForAPI = convertToStandardWalletAddress(
		walletAddress.toString()
	);
	const ingredientArray: Trait[] = [];
	const backgroundArray: Trait[] = [];
	try {
		const result = await client.query({
			query: GET_BACKPACK_TOKENS_BY_ADDRESS,
			variables: { address: walletAddressForAPI },
		});
		const tokens = result.data.user.backpackTokens;
		tokens.map((tokenObj: any) => {
			const token = tokenObj.traitMetadata;
			if (token.isIngredient) {
				const value = token.imageUrl.substring(
					token.imageUrl.lastIndexOf("_") + 1,
					token.imageUrl.lastIndexOf(".")
				);
				const ingTrait: Trait = {
					id: Number(value),
					name: FACE_TRAITS[Number(value)].name,
					link: FACE_TRAITS[Number(value)].link,
					tokenId: token.id,
					marketViewLink: FACE_TRAITS[Number(value)].marketViewLink,
					premiumPrice: FACE_TRAITS[Number(value)].premiumPrice,
				};
				ingredientArray.push(ingTrait);
			} else {
				const value = token.imageUrl.substring(
					token.imageUrl.lastIndexOf("_") + 1,
					token.imageUrl.lastIndexOf(".")
				);
				const bgTrait: Trait = {
					id: Number(value),
					name: BACKGROUND[Number(value)].name,
					link: BACKGROUND[Number(value)].link,
					tokenId: token.id,
					marketViewLink: BACKGROUND[Number(value)].marketViewLink,
					premiumPrice: BACKGROUND[Number(value)].premiumPrice,
				};
				backgroundArray.push(bgTrait);
			}
		});
	} catch (error) {
		console.error(error);
	}

	return {
		ingredientArray: ingredientArray,
		backgroundArray: backgroundArray,
	};
}

export async function getVotingPower(walletAddress: String) {
	const query = GET_VOTING_POWER_QUERY;
	let votingPower = 0;
	const walletAddressForAPI = convertToStandardWalletAddress(
		walletAddress.toString()
	);
	try {
		const result = await client.query({
			query,
			variables: { address: walletAddressForAPI },
		});
		votingPower = result.data.user.getVotingPower;
	} catch (error) {
		console.log(error);
	}
	return votingPower;
}
export function getSecretKey() {
	const secretKey = process.env.SECRET_KEY;
	if (!secretKey) {
		throw new Error("Secret key not found in environment variables");
	}
	return secretKey;
}
export function getWeb3ConnectId() {
	const result = process.env.WEB_3_CONNECT_ID;
	if (!result) {
		throw new Error("Web3 connect id not found in environment variables");
	}
	return result;
}
export async function getRedemptionSignature(
	contract_address: string,
	token_id: number
) {
	const secret = getSecretKey();
	//generate hash with NFT contract address, NFT token id, and secret
	const hash = Web3.utils.soliditySha3(
		{ t: "uint256", v: contract_address },
		{ t: "uint256", v: new BN(token_id) },
		{ t: "uint256", v: secret }
	);
	const msg = {
		domain: {
			name: "get testpilled",
			version: "1",
		},
		message: {
			testPillClaimHash: hash,
		},
		primaryType: "Payload",
		types: {
			EIP712Domain: [
				{ name: "name", type: "string" },
				{ name: "version", type: "string" },
			],
			Payload: [{ name: "testPillClaimHash", type: "uint256" }],
		},
	};
	try {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		const signature = await window.ethereum.request({
			method: "eth_signTypedData_v4",
			from: accounts[0],
			params: [accounts[0], JSON.stringify(msg)],
		});

		return decodeSignature(signature);
	} catch (error) {
		console.log("signing error");
		return "error";
	}
}

export function decodeSignature(signature: string): decodedSignature {
	const decoded = Web3.utils.hexToBytes(signature);
	const rLow = decoded.slice(0, 16);
	const rHigh = decoded.slice(16, 32);
	const sLow = decoded.slice(32, 48);
	const sHigh = decoded.slice(48, 64);
	const v = decoded.slice(64);
	// Convert number arrays to hex strings
	const rLowHex = Web3.utils.bytesToHex(rLow);
	const rHighHex = Web3.utils.bytesToHex(rHigh);
	const sLowHex = Web3.utils.bytesToHex(sLow);
	const sHighHex = Web3.utils.bytesToHex(sHigh);
	//minus 27 because jin khai said so.
	const vHex =
		(Web3.utils.hexToNumber(Web3.utils.bytesToHex(v)) as number) - 27;

	return {
		v: vHex,
		rLow: rLowHex,
		rHigh: rHighHex,
		sLow: sLowHex,
		sHigh: sHighHex,
	} as decodedSignature;
}

export function zeroPadHexString(hexString: string): string {
	const cleanedHex = hexString.replace(/^0x/, "").toLowerCase();
	const paddedHex = cleanedHex.padStart(64, "0");
	return `0x${paddedHex}`;
}

export function convertUnixToDate(unixTimestamp: number) {
	const date = new Date(unixTimestamp);
	const now = new Date();

	const timeDiffInMilliseconds: number = now.getTime() - date.getTime();

	const secondsDiff: number = Math.floor(timeDiffInMilliseconds / 1000);
	const minutesDiff: number = Math.floor(secondsDiff / 60);
	const hoursDiff: number = Math.floor(minutesDiff / 60);
	const daysDiff: number = Math.floor(hoursDiff / 24);
	const monthsDiff: number = Math.floor(daysDiff / 30); // Approximate value

	if (monthsDiff >= 1) {
		return `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
	} else if (daysDiff >= 1) {
		return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
	} else if (hoursDiff >= 1) {
		return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
	} else if (minutesDiff >= 1) {
		return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
	} else {
		return "Less than a minute ago";
	}
}
//Login with wallet address for social.
export async function login(walletAddress: string) {
	clearLocalStorage();
	try {
		const response = await fetch(
			`${STARKPILL_SOCIAL_API_ENDPOINT}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ walletAddress }),
			}
		);
		const data = await response.json();
		localStorage.setItem("access_token", data.access_token);
		localStorage.setItem(
			"walletAddress",
			convertToStandardWalletAddress(walletAddress)
		);
	} catch (error) {
		// Handle error
		console.error("Error during login:", error);
	}
}

// Logout
export async function logout() {
	localStorage.removeItem("access_token");
	localStorage.removeItem("walletAddress");
}

// Clear Local Storage
function clearLocalStorage() {
	// remove all data accept lastUsedConnector
	for (const key in localStorage) {
		if (key !== "lastUsedConnector") {
			localStorage.removeItem(key);
		}
	}
	//localStorage.clear(); // This will remove all data from Local Storage
}

// follow a user
// endpoint /account/follow

export async function followUser(walletAddress: string) {
	// add access_token to header from localStorage

	const response = await fetch(
		`${STARKPILL_SOCIAL_API_ENDPOINT}/account/follow`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("access_token"),
			},
			body: JSON.stringify({ walletAddress }),
		}
	);
	return response;
}

//unfollow a user
// endpoint /account/unfollow
export async function unfollowUser(walletAddress: string) {
	const response = await fetch(
		`${STARKPILL_SOCIAL_API_ENDPOINT}/account/unfollow`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("access_token"),
			},
			body: JSON.stringify({ walletAddress }),
		}
	);

	return response;
}

//remove a follower
export async function removeFollower(walletAddress: string) {
	const response = await fetch(
		`${STARKPILL_SOCIAL_API_ENDPOINT}/account/removeFollower`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("access_token"),
			},
			body: JSON.stringify({ walletAddress }),
		}
	);
	return response;
}

//Set Twitter
//endpoint /account/updateInfo
export async function setTwitterHandle(twitterHandle: string) {
	const response = await fetch(
		`${STARKPILL_SOCIAL_API_ENDPOINT}/account/updateInfo`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("access_token"),
			},
			body: JSON.stringify({ twitterHandle }),
		}
	);
	return response;
}
//remove Twitter account
//endpoint /account/updateInfo
export async function removeTwitterHandle() {
	const response = await fetch(
		`${STARKPILL_SOCIAL_API_ENDPOINT}/account/updateInfo`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("access_token"),
			},
			body: JSON.stringify({ twitterHandle: null }),
		}
	);
	return response;
}

//create a post
//endpoint /account/createPost
export async function createPost(content: string, file: File | Blob | null) {
	const formData = new FormData();

	formData.append("content", content);

	// Check if a file is provided and append it to the form data
	if (file) {
		formData.append("image", file);
	}

	try {
		const response = await fetch(
			`${STARKPILL_SOCIAL_API_ENDPOINT}/account/createPost`,
			{
				method: "POST",
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"), // Fix the Authorization header
				},
				body: formData,
			}
		);

		if (response.ok) {
			const data = await response.json();
			// Handle the response data as needed
			console.log("Response data:", data);
		} else {
			// Handle the error response
			console.error("API call failed");
		}
		return response;
	} catch (error) {
		// Handle network or other errors
		console.error("Error:", error);
	}
}

//update PFP
//endpoint /account/updateInfo
export async function updateProfilePicture(tokenId: number) {
	const response = await fetch(
		`${STARKPILL_SOCIAL_API_ENDPOINT}/account/updateInfo`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + localStorage.getItem("access_token"),
			},
			body: JSON.stringify({ profilePictureTokenId: tokenId }),
		}
	);
	return response;
}

export async function getTokenImage(tokenId: number | null) {
	if (!tokenId) {
		return "/basepill.png";
	}
	try {
		const result = await client.query({
			query: GET_TOKEN_IMAGE_BY_ID,
			variables: { tokenId: tokenId },
		});
		return result.data.token.metadata.imageUrl;
	} catch (error) {
		console.error(error);
	}
}
