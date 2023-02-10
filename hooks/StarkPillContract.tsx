import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";
import starkpillAbi from "../abi/testpill.json";
import {
	STARKPILL_CONTRACT_ADDRESS,
	STARKETH_CONTRACT_ADDRESS,
} from "../types/constants";
import { Trait } from "../types/interfaces";
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
