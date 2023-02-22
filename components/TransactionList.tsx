import {
	useTransactionManager,
	useTransactionReceipt,
} from "@starknet-react/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/TransactionList.module.css";
import { shortAddressForModal } from "../types/utils";
import Href from "../public/hrefIcon.svg";

export const TransactionList = () => {
	const { hashes } = useTransactionManager();

	if (hashes.length == 0) {
		return (
			<div className={styles.container}>
				<h2>recent transactions</h2>
				<span>You have no recent transactions</span>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<h2>recent transactions</h2>
			{hashes
				.map(
					(data, index) =>
						data && <TransactionItem transactionHash={data} key={index} />
				)
				.reverse()}
		</div>
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
					return "green";
				}
				case "ACCEPTED_ON_L2": {
					return "green";
				}
				case "NOT_RECEIVED": {
					return "red";
				}
				case "REJECTED": {
					return "red";
				}
				case "PENDING": {
					return "yellow";
				}
				case "RECEIVED": {
					return "yellow";
				}
				default: {
					return "yellow";
				}
			}
		} else return "yellow";
	}, [data?.status]);
	let statusColor = getStatusColor();
	useEffect(() => {
		getStatusColor();
	}, [getStatusColor, loading]);
	const copyTxAddress = (txAddress: string) => {
		navigator.clipboard.writeText(txAddress);
		setShowSnackBar(true);
		setTimeout(() => setShowSnackBar(false), 1000);
	};

	return (
		<div className={styles.transactionItem}>
			<div className={styles.dot} style={{ background: statusColor }}></div>
			<div className={styles.txAddress}>
				<u>{shortAddressForModal(transactionHash)} </u>
			</div>
			<Link
				href={`https://testnet.starkscan.co/tx/${transactionHash}`}
				target="_blank">
				<picture className={styles.icon}>
					<Href style={{ color: "#FFFFFF" }} />
				</picture>
			</Link>
			<picture className={styles.icon}>
				<img
					src="/copyIcon.svg"
					onClick={() => copyTxAddress(transactionHash)}
					style={{ cursor: "pointer" }}
					alt=""></img>
			</picture>
			{showSnackBar && (
				<div className="snackbar">transaction address copied</div>
			)}
		</div>
	);
}
