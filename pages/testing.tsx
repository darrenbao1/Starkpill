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
	// const { addTransaction } = useTransactionManager();
	// const { address } = useAccount();
	// const calls = [
	// 	{
	// 		contractAddress: STARKPILL_CONTRACT_ADDRESS,
	// 		entrypoint: "scalarRemoveFrom",
	// 		calldata: [510, 0, 511, 0],
	// 	},
	// 	{
	// 		contractAddress: STARKPILL_CONTRACT_ADDRESS,
	// 		entrypoint: "scalarTransferFrom",
	// 		calldata: [address, 351, 0, 510, 0],
	// 	},
	// ];
	// const { execute } = useStarknetExecute({
	// 	calls: calls,
	// });
	// return (
	// 	<div>
	// 		testing <button onClick={() => execute()}>Press here</button>
	// 	</div>
	// );
	const offsetIncrement = 2;
	const [offsetAmount, setOffsetAmount] = useState(0);
	const GET_ALL_TOKENS = gql`
		query AllTokens($skip: Int, $first: Int) {
			allTokens(skip: $skip, first: $first) {
				id
				owner {
					address
				}
				metadata {
					imageUrl
					mintPrice
				}
			}
		}
	`;
	const { data, loading, error, fetchMore } = useQuery(GET_ALL_TOKENS, {
		variables: {
			skip: 0,
			first: 5,
		},
	});
	if (loading) {
		return <h1>wow</h1>;
	}
	if (error) {
		console.error(error);
	}
	const tokenIds = data.allTokens;
	console.log(tokenIds);
	return (
		<div>
			{tokenIds.map((token: any, index: number) => (
				<div key={token.id}>
					<h1>
						{index + 1} {token.id}
					</h1>
					<h2>{token.owner.address}</h2>
					<h2>{token.metadata.mintPrice}</h2>
				</div>
			))}
			<button
				onClick={() => {
					console.log("testing");
					fetchMore({
						variables: {
							skip: 5,
						},
					});
				}}
			>
				Load More
			</button>
			<button onClick={() => console.log(data.allTokens)}>testing</button>
		</div>
	);
}
