import { STARKPILL_CONTRACT_ADDRESS } from "../types/constants";

export function getMintVariables(
	faceId: number,
	backgroundId: number,
	mintPrice: number
) {
	const mintTransactionVariables = [
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
