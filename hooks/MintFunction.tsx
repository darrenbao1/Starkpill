import {
	STARKETH_CONTRACT_ADDRESS,
	STARKPILL_CONTRACT_ADDRESS,
} from "../types/constants";

export function getMintVariables(
	faceId: number,
	backgroundId: number,
	mintPrice: number
) {
	const mintTransactionVariables = [
		//Approve starkEth tokens call
		{
			contractAddress: STARKETH_CONTRACT_ADDRESS,
			entrypoint: "approve",
			calldata: [
				STARKPILL_CONTRACT_ADDRESS,
				"0x" + (mintPrice * Math.pow(10, 18)).toString(16),
				0,
			],
		},
		//Mint token call
		{
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "mint",
			calldata: [
				faceId,
				backgroundId,
				"0x" + (mintPrice * Math.pow(10, 18)).toString(16),
				0,
			],
		},
	];

	return mintTransactionVariables;
}
