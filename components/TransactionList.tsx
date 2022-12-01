import { useTransactionManager } from "@starknet-react/core";

export const TransactionList = () => {
	const { hashes } = useTransactionManager();
	if (hashes.length == 0) {
		return (
			<div style={{ margin: "1rem 0" }}>
				<h2>recent transactions</h2>
				You have no recent transactions
			</div>
		);
	}
	return (
		<div style={{ margin: "1rem 0" }}>
			{hashes
				.map(
					(data, index) =>
						data && <div>something</div>
				)
				.reverse()}
		</div>
	);
};
