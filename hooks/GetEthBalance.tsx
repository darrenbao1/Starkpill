import { useAccount, useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { useStarkEthContract } from "./StarkEthContract";
export function UserBalance() {
	const { contract } = useStarkEthContract();
	const { address } = useAccount();
	const { data, loading, error } = useStarknetCall({
		contract,
		method: "balanceOf",
		args: address ? [address] : undefined,
		options: {
			watch: true,
		},
	});
	const ethBalance = useMemo(() => {
		if (loading || !data?.length) {
			return <span>...</span>;
		}
		if (error) {
			return <span>...</span>;
		}
		if (data && data.length > 0) {
			let value = uint256ToBN(data[0]);
			value = value / Math.pow(10, 18);
			return <span>{Number(value).toFixed(4).toString()}</span>;
		} else {
			return null;
		}
	}, [data, error, loading]);
	return ethBalance;
}
