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
