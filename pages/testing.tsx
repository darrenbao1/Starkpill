import { useQuery, gql } from "@apollo/client";
import {
	useAccount,
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import { useState } from "react";
import { STARKPILL_CONTRACT_ADDRESS } from "../types/constants";
import { toBN } from "starknet/dist/utils/number";
import { bnToUint256 } from "starknet/dist/utils/uint256";

export default function Test() {
	const { addTransaction } = useTransactionManager();
	const { address } = useAccount();
	const calls = [
		{
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarRemoveFrom",
			calldata: [510, 0, 351, 0],
		},
		{
			contractAddress: STARKPILL_CONTRACT_ADDRESS,
			entrypoint: "scalarTransferFrom",
			calldata: [address, 511, 0, 510, 0],
		},
	];
	const { execute } = useStarknetExecute({
		calls: calls,
	});
	return (
		<div>
			testing <button onClick={() => execute()}>Press here</button>
		</div>
	);
}
