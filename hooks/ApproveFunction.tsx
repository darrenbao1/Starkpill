import {
	STARKETH_CONTRACT_ADDRESS,
	STARKPILL_CONTRACT_ADDRESS,
} from "../types/constants";

export function getApproveVariables(mintPrice: number) {
	const allowanceCall = [
		{
			contractAddress: STARKETH_CONTRACT_ADDRESS,
			entrypoint: "approve",
			calldata: [
				STARKPILL_CONTRACT_ADDRESS,
				"0x" + (mintPrice * Math.pow(10, 18)).toString(16),
				0,
			],
		},
	];
	return allowanceCall;
}
