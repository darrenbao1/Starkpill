import { useAccount, useBalance } from "@starknet-react/core";
import { useMemo } from "react";

export function UserBalance() {
	const { address } = useAccount();
	const { data, isLoading, error } = useBalance({
		address,
	});
	const ethBalance = useMemo(() => {
		if (isLoading) {
			return <span>...</span>;
		}
		if (error) {
			return <span>...</span>;
		}
		if (data) {
			return (
				<span>
					{data.formatted} {data.symbol}
				</span>
			);
		} else {
			return null;
		}
	}, [data, error, isLoading]);
	return ethBalance;
}
