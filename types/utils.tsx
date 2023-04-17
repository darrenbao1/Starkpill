import { gql, useQuery } from "@apollo/client";
import { BACKGROUND, FACE_TRAITS, GET_VOTING_POWER_QUERY } from "./constants";
import { Trait } from "./interfaces";
import client from "../apollo-client";
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
