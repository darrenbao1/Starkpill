import { gql, useQuery } from "@apollo/client";
import {
	BACKGROUND,
	FACE_TRAITS,
	GET_VOTING_POWER_QUERY,
	NETWORK_FOR_API,
	STARKPILL_CONTRACT_ADDRESS,
} from "./constants";
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

// export async function getUserBackPack(walletAddress: String) {
// 	const ingredientArray: Trait[] = [];
// 	const backgroundArray: Trait[] = [];
// 	return await fetch(
// 		MINTSQUARE_BASE_URL +
// 			"nfts/" +
// 			NETWORK_FOR_API +
// 			"?collection=" +
// 			STARKPILL_CONTRACT_ADDRESS +
// 			"&owner_address=" +
// 			walletAddress,
// 		{
// 			method: "get",
// 			mode: "cors",
// 			headers: {
// 				"Access-Control-Allow-Origin": "*",
// 			},
// 		}
// 	)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			data.map((token: any) => {
// 				if (!token.metadata.name.startsWith("TestPill")) {
// 					if (token.metadata.name.startsWith("PillBackground")) {
// 						const value = token.metadata.image.substring(
// 							token.metadata.image.lastIndexOf("_") + 1,
// 							token.metadata.image.lastIndexOf(".")
// 						);
// 						const bgTrait: Trait = {
// 							id: Number(value),
// 							name: BACKGROUND[Number(value)].name,
// 							link: BACKGROUND[Number(value)].link,
// 							tokenId: token.token_id,
// 						};
// 						backgroundArray.push(bgTrait);
// 					} else {
// 						const value = token.metadata.image.substring(
// 							token.metadata.image.lastIndexOf("_") + 1,
// 							token.metadata.image.lastIndexOf(".")
// 						);
// 						const ingTrait: Trait = {
// 							id: Number(value),
// 							name: FACE_TRAITS[Number(value)].name,
// 							link: FACE_TRAITS[Number(value)].link,
// 							tokenId: token.token_id,
// 						};
// 						ingredientArray.push(ingTrait);
// 					}
// 				}
// 			});
// 			return {
// 				ingredientArray: ingredientArray,
// 				backgroundArray: backgroundArray,
// 			};
// 		});
// }
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
		console.log(result.data.user.getVotingPower);
		votingPower = result.data.user.getVotingPower;
	} catch (error) {}
	return votingPower;
}
