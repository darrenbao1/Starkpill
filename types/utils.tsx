import { gql, useQuery } from "@apollo/client";
import {
	BACKGROUND,
	FACE_TRAITS,
	GET_VOTING_POWER_QUERY,
	STARKPILL_CONTRACT_ADDRESS,
} from "./constants";
import { Trait } from "./interfaces";
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
			verifyingContract: STARKPILL_CONTRACT_ADDRESS,
		},
		message: {
			testPillClaimHash: hash,
		},
		primaryType: "Payload",
		types: {
			domain: [
				{ name: "name", type: "string" },
				{ name: "version", type: "string" },
				{ name: "verifyingContract", type: "address" },
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
		return signature;
	} catch (error) {
		console.log("signing error");
		return "error";
	}
}
