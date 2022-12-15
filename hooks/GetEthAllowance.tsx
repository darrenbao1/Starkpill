import { useAccount, useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { STARKPILL_CONTRACT_ADDRESS } from "../types/constants";
import { useStarkEthContract } from "./StarkEthContract";
function GetAllowanceBalanceInEth() {
	const { contract } = useStarkEthContract();
	const { address } = useAccount();
	const { data, loading, error } = useStarknetCall({
		contract,
		method: "allowance",
		args: address ? [address, STARKPILL_CONTRACT_ADDRESS] : undefined,
		options: {
			watch: true,
		},
	});
	const ethAllowanceBalance = useMemo(() => {
		if (loading || !data?.length) {
			return null;
		}
		if (error) {
			return null;
		}
		if (data && data.length > 0) {
			const gweiValue = uint256ToBN(data[0]);
			const ethValue = gweiValue / Math.pow(10, 18);
			return ethValue;
		} else {
			return null;
		}
	}, [data, error, loading]);
	return ethAllowanceBalance;
}

export function HasEnoughAllowance(mintPrice: number): boolean {
	let ethAllowance = GetAllowanceBalanceInEth();
	if (ethAllowance != null) {
		if (ethAllowance >= mintPrice) {
			return true;
		} else {
			return false;
		}
	}
	return false;
}
