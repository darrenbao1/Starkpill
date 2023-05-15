import {
	useTransactionManager,
	useTransactionReceipt,
} from "@starknet-react/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { shortAddressForModal } from "../../types/utils";
import { IS_TESTNET } from "../../types/constants";
import {
	Container,
	CopyIcon,
	Dot,
	HrefStyled,
	IconContainer,
	StatusContainer,
	TransactionItems,
	TxAddress,
} from "./TransactionList.styles";

export const TransactionList = () => {
	const { hashes } = useTransactionManager();

	if (hashes.length == 0) {
		return (
			<Container>
				<h1>Recent transactions</h1>
				<span>You have no recent transactions</span>
			</Container>
		);
	}
	return (
		<Container>
			<h2>Recent transactions({hashes.length})</h2>
			{hashes
				.map(
					(data, index) =>
						data && <TransactionItem transactionHash={data} key={index} />
				)
				.reverse()}
		</Container>
	);
};

function TransactionItem({ transactionHash }: { transactionHash: string }) {
	const [showSnackBar, setShowSnackBar] = useState(false);
	const { data, loading } = useTransactionReceipt({
		hash: transactionHash,
	});
	const getStatusColor = useCallback(() => {
		if (data?.status != undefined) {
			switch (data.status) {
				case "ACCEPTED_ON_L1": {
					return "#04D300";
				}
				case "ACCEPTED_ON_L2": {
					return "#04D300";
				}
				case "NOT_RECEIVED": {
					return "#FF4026";
				}
				case "REJECTED": {
					return "#FF4026";
				}
				case "PENDING": {
					return "#FFAC40";
				}
				case "RECEIVED": {
					return "#FFAC40";
				}
			}
		} else return "yellow";
	}, [data?.status]);
	let statusColor = getStatusColor();

	const getStatusText = useCallback(() => {
		if (data?.status != undefined) {
			switch (data.status) {
				case "ACCEPTED_ON_L1": {
					return "Completed";
				}
				case "ACCEPTED_ON_L2": {
					return "Completed";
				}
				case "NOT_RECEIVED": {
					return "Unsuccessful";
				}
				case "REJECTED": {
					return "Unsuccessful";
				}
				case "PENDING": {
					return "In Progress";
				}
				case "RECEIVED": {
					return "In Progress";
				}
			}
		} else return "Pending";
	}, [data?.status]);
	let statusText = getStatusText();
	useEffect(() => {
		getStatusColor();
	}, [getStatusColor, loading]);
	const copyTxAddress = (txAddress: string) => {
		navigator.clipboard.writeText(txAddress);
		setShowSnackBar(true);
		setTimeout(() => setShowSnackBar(false), 1000);
	};
	return (
		<>
			<StatusContainer color={statusColor}>
				<Dot color={statusColor}></Dot>
				<text>{statusText}</text>
			</StatusContainer>
			<TransactionItems>
				<TxAddress>
					<u>{shortAddressForModal(transactionHash)}</u>
				</TxAddress>
				<Link
					href={`https://${
						IS_TESTNET ? "testnet." : ""
					}starkscan.co/tx/${transactionHash}`}
					target="_blank">
					<IconContainer>
						<HrefStyled />
					</IconContainer>
				</Link>
				<CopyIcon onClick={() => copyTxAddress(transactionHash)} />
			</TransactionItems>

			{showSnackBar && (
				<div className="snackbar">Transaction address copied</div>
			)}
		</>
	);
}
