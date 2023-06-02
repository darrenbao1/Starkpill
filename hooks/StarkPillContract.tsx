import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";
import starkpillAbi from "../abi/testpill.json";
import {
	STARKPILL_CONTRACT_ADDRESS,
	STARKETH_CONTRACT_ADDRESS,
} from "../types/constants";
import { Trait, decodedSignature } from "../types/interfaces";
export function useStarkPillContract() {
	return useContract({
		abi: starkpillAbi as Abi,
		address: STARKPILL_CONTRACT_ADDRESS,
	});
}

export function getEquipCalls(
	equipArray: Trait[],
	address: string,
	tokenId: Number
) {
	let calls = [];
	for (let i = 0; i < equipArray.length; i++) {
		if (equipArray[i].tokenId == 0) continue;
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarTransferFrom",
			calldata: [address, Number(equipArray[i].tokenId), 0, tokenId, 0],
		});
	}
	return calls;
}

export function getUnequipCalls(unEquipArray: Trait[], tokenId: Number) {
	let calls = [];
	for (let i = 0; i < unEquipArray.length; i++) {
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [tokenId, 0, Number(unEquipArray[i].tokenId), 0],
		});
	}
	return calls;
}

export function getMintVariables(
	faceId: number,
	backgroundId: number,
	mintPrice: number
) {
	const Decimal = require("decimal.js");
	let number = new Decimal(mintPrice.toFixed(3));
	let decimalPlaces = 18;
	number = number.mul(Decimal.pow(10, decimalPlaces));
	number = number.round();
	let hexadecimal = number.toHexadecimal();
	const mintTransactionVariables = [
		//Approve starkEth tokens call
		{
			contractAddress: STARKETH_CONTRACT_ADDRESS,
			entrypoint: "approve",
			calldata: [STARKPILL_CONTRACT_ADDRESS, hexadecimal, 0],
		},
		//Mint token call
		{
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "mint",
			calldata: [faceId, backgroundId, hexadecimal, 0],
		},
	];

	return mintTransactionVariables;
}
export function getFameOrDefameVariables(
	fameOrDefame: string,
	tokenId: number,
	amount: number
) {
	const Decimal = require("decimal.js");
	let tokenIdInHex = Decimal(tokenId).toHexadecimal();
	const fameOrDefameTransactionVariables = [];
	if (fameOrDefame === "fame") {
		fameOrDefameTransactionVariables.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "famePill",
			calldata: [tokenIdInHex, 0, amount],
		});
	} else if (fameOrDefame === "defame") {
		fameOrDefameTransactionVariables.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "deFamePill",
			calldata: [tokenIdInHex, 0, amount],
		});
	}
	return fameOrDefameTransactionVariables;
}

export function getRedemptionVariables(
	walletAddress: string,
	collabContractAddress: string,
	l1_tokenId: number,
	signature: decodedSignature
) {
	const signature_len = 5;
	const redemptionTransactionVariables = [
		{
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "claimL1Trait",
			calldata: [
				walletAddress,
				collabContractAddress,
				l1_tokenId,
				signature_len,
				signature.v,
				signature.rLow,
				signature.rHigh,
				signature.sLow,
				signature.sHigh,
			],
		},
	];
	return redemptionTransactionVariables;
}
