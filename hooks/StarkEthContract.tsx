import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import starkEthAbi from "../abi/starkEth.json";
import { STARKETH_CONTRACT_ADDRESS } from "../types/constants";
export function useStarkEthContract() {
	return useContract({
		abi: starkEthAbi as Abi,
		address: STARKETH_CONTRACT_ADDRESS,
	});
}
