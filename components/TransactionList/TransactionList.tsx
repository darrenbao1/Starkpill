import { useTransactionManager, useTransaction } from "@starknet-react/core";
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
	const { data, isLoading, status } = useTransaction({
		hash: transactionHash,
	});
	const getStatusColor = useCallback(() => {
		if (status != undefined) {
			switch (status) {
				case "success": {
					return "#04D300";
				}
				case "error": {
					return "#FF4026";
				}
				case "loading": {
					return "#FFAC40";
				}
			}
		} else return "yellow";
	}, [status]);
	let statusColor = getStatusColor();

	const getStatusText = useCallback(() => {
		if (status != undefined) {
			switch (status) {
				case "success": {
					return "Completed";
				}
				case "error": {
					return "Unsuccessful";
				}
				case "loading": {
					return "In Progress";
				}
			}
		} else return "Pending";
	}, [status]);
	let statusText = getStatusText();
	useEffect(() => {
		getStatusColor();
	}, [getStatusColor, isLoading]);
	const copyTxAddress = (txAddress: string) => {
		navigator.clipboard.writeText(txAddress);
		setShowSnackBar(true);
		setTimeout(() => setShowSnackBar(false), 1000);
	};
	return (
		<>
			<StatusContainer color={statusColor!}>
				<Dot color={statusColor!}></Dot>
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
