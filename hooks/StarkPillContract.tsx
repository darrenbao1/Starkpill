import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";
import starkpillAbi from "../abi/testpill.json";
import {
	STARKPILL_CONTRACT_ADDRESS,
	STARKETH_CONTRACT_ADDRESS,
} from "../types/constants";
import {
	InventoryTokenObj,
	StarkpillToken,
	Trait,
	decodedSignature,
} from "../types/interfaces";
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
				0,
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

export function getSwitchCalls(
	equippedByToken: StarkpillToken,
	traitObj: InventoryTokenObj,
	address: string
) {
	console.log("Switch function is called");
	let calls: {
		contractAddress: string;
		entrypoint: string;
		calldata: any[];
	}[] = [];
	const { isIngredient } = traitObj;
	//Unequip the current Trait
	//if isIngredient is true, remove the ingredient from the pill
	if (isIngredient) {
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [equippedByToken.tokenId, 0, equippedByToken.ingId, 0],
		});
	} else {
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [equippedByToken.tokenId, 0, equippedByToken.bgId, 0],
		});
	}
	//need to check if traitObj is equipped by another token
	//if it is, need to unequip it from that token
	if (traitObj.equippedById != 0) {
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [traitObj.equippedById, 0, traitObj.id, 0],
		});
	}
	//Equip the traitObj Trait
	calls.push({
		contractAddress: STARKPILL_CONTRACT_ADDRESS,
		entrypoint: "scalarTransferFrom",
		calldata: [address, traitObj.id, 0, equippedByToken.tokenId, 0],
	});

	return calls;
}

export function getUnequipCall(
	equippedByToken: StarkpillToken,
	isIngredient: boolean
) {
	console.log("Unequip function is called");
	//Check if is ingredient to remove the relevant trait.
	if (isIngredient) {
		return [
			{
				contractAddress: STARKPILL_CONTRACT_ADDRESS,
				entrypoint: "scalarRemoveFrom",
				calldata: [equippedByToken.tokenId, 0, equippedByToken.ingId, 0],
			},
		];
	} else {
		return [
			{
				contractAddress: STARKPILL_CONTRACT_ADDRESS,
				entrypoint: "scalarRemoveFrom",
				calldata: [equippedByToken.tokenId, 0, equippedByToken.bgId, 0],
			},
		];
	}
}

export function getEquipOnAnotherPillCalls(
	equipOntoPill: StarkpillToken,
	traitObj: InventoryTokenObj,
	address: string
) {
	console.log("Equip trait onto another pill function is called");
	const { isIngredient } = traitObj;
	let calls: {
		contractAddress: string;
		entrypoint: string;
		calldata: any[];
	}[] = [];
	//traitObj won't be equipped as it's already unequipped don't need to check.
	//Need to check the equipOntoPill if it already has the trait type equipped.
	//If it does, need to unequip it first.
	if (isIngredient && equipOntoPill.ingId != 0) {
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [equipOntoPill.tokenId, 0, equipOntoPill.ingId, 0],
		});
	}
	if (!isIngredient && equipOntoPill.bgId != 0) {
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [equipOntoPill.tokenId, 0, equipOntoPill.bgId, 0],
		});
	}
	//Equip the traitObj Trait
	calls.push({
		contractAddress: STARKPILL_CONTRACT_ADDRESS,
		entrypoint: "scalarTransferFrom",
		calldata: [address, traitObj.id, 0, equipOntoPill.tokenId, 0],
	});
}
