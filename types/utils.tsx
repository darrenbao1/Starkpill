import { gql } from "@apollo/client";
import {
	BACKGROUND,
	FACE_TRAITS,
	GET_VOTING_POWER_QUERY,
	STARKPILL_CONTRACT_ADDRESS,
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
	const query = gql`
		query OwnerBackpack($ownerAddress: String!) {
			ownerBackpack(ownerAddress: $ownerAddress) {
				id
				imageUrl
				isIngredient
				itemName
			}
		}
	`;
	try {
		const result = await client.query({
			query,
			variables: { ownerAddress: walletAddressForAPI },
		});
		const tokens = result.data.ownerBackpack;
		tokens.map((token: any) => {
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
		{ t: "uint256", v: new BN(4967) },
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
