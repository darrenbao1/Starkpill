import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";
import starkpillAbi from "../abi/testpill.json";
import { STARKPILL_CONTRACT_ADDRESS } from "../types/constants";
export function useStarkPillContract() {
	return useContract({
		abi: starkpillAbi as Abi,
		address: STARKPILL_CONTRACT_ADDRESS,
	});
}

export function getEquipCalls(
	equipArray: Number[],
	address: string,
	tokenId: Number
) {
	let calls = [];
	for (let i = 0; i < equipArray.length; i++) {
		if (equipArray[i] == 0) continue;
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarTransferFrom",
			calldata: [address, Number(equipArray[i]), 0, tokenId, 0],
		});
	}
	return calls;
}

export function getUnequipCalls(unEquipArray: Number[], tokenId: Number) {
	let calls = [];
	for (let i = 0; i < unEquipArray.length; i++) {
		calls.push({
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [tokenId, 0, Number(unEquipArray[i]), 0],
		});
	}
	return calls;
}
