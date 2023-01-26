import {
	BACKGROUND,
	FACE_TRAITS,
	MINTSQUARE_BASE_URL,
	NETWORK_FOR_API,
	STARKPILL_CONTRACT_ADDRESS,
} from "./constants";
import { Trait } from "./interfaces";

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
// 	await fetch(
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
// 						let bgTrait: Trait = BACKGROUND[Number(value)];
// 						bgTrait.tokenId = token.token_id;
// 						backgroundArray.push(bgTrait);
// 					} else {
// 						const value = token.metadata.image.substring(
// 							token.metadata.image.lastIndexOf("_") + 1,
// 							token.metadata.image.lastIndexOf(".")
// 						);
// 						let ingTrait: Trait = FACE_TRAITS[Number(value)];
// 						ingTrait.tokenId = token.token_id;
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
export async function getUserBackPack(walletAddress: String) {
	const ingredientArray: Trait[] = [];
	const backgroundArray: Trait[] = [];
	return await fetch(
		MINTSQUARE_BASE_URL +
			"nfts/" +
			NETWORK_FOR_API +
			"?collection=" +
			STARKPILL_CONTRACT_ADDRESS +
			"&owner_address=" +
			walletAddress,
		{
			method: "get",
			mode: "cors",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			data.map((token: any) => {
				if (!token.metadata.name.startsWith("TestPill")) {
					if (token.metadata.name.startsWith("PillBackground")) {
						const value = token.metadata.image.substring(
							token.metadata.image.lastIndexOf("_") + 1,
							token.metadata.image.lastIndexOf(".")
						);
						let bgTrait: Trait = BACKGROUND[Number(value)];
						bgTrait.tokenId = token.token_id;
						backgroundArray.push(bgTrait);
					} else {
						const value = token.metadata.image.substring(
							token.metadata.image.lastIndexOf("_") + 1,
							token.metadata.image.lastIndexOf(".")
						);
						let ingTrait: Trait = FACE_TRAITS[Number(value)];
						ingTrait.tokenId = token.token_id;
						ingredientArray.push(ingTrait);
					}
				}
			});
			return {
				ingredientArray: ingredientArray,
				backgroundArray: backgroundArray,
			};
		});
}
