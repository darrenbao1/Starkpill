import {
	useAccount,
	useConnectors,
} from "@starknet-react/core";
import { useEffect, useState } from "react";
import { shortenAddress } from "../types/utils";
import ConnectMenuModal from "./Modals/ConnectMenuModal";
import styles from "../styles/ConnectWalletButton.module.css";
import { TransactionList } from "./TransactionList";
export const ConnectWalletButton = () => {
	const { account, address } = useAccount();
	const { available, refresh, disconnect } =
		useConnectors();
	const [
		showConnectMenuModal,
		setShowConnectMenuModal,
	] = useState(false);

	//useEffect to check the available wallet user has installed
	useEffect(() => {
		const interval = setInterval(refresh, 5000);
		return () => clearInterval(interval);
	}, [refresh]);
	return (
		<>
			{!account ? (
				<div
					className="connectWalletButton"
					onClick={() =>
						setShowConnectMenuModal(true)
					}
				>
					connect wallet
				</div>
			) : (
				<ConnectedButton
					address={address!}
					disconnect={() => disconnect}
				/>
			)}
			{showConnectMenuModal ? (
				<ConnectMenuModal
					connectors={available}
					close={() =>
						setShowConnectMenuModal(false)
					}
				/>
			) : null}
		</>
	);
};

const ConnectedButton = (props: {
	address: string;
	disconnect: any;
}) => {
	const [showDropDown, setShowDropDown] =
		useState(false);
	const [showSnackBar, setShowSnackBar] =
		useState(false);
	const CopyAddress = (walletAddress: string) => {
		navigator.clipboard.writeText(walletAddress);
		setShowSnackBar(true);
		setTimeout(
			() => setShowSnackBar(false),
			1000
		);
	};
	return (
		<>
			<div
				className="connectWalletButton"
				onClick={() =>
					setShowDropDown(!showDropDown)
				}
			>
				{shortenAddress(props.address)} &nbsp;{" "}
				<picture>
					<img
						src="/downArrow.svg"
						alt=""
						style={
							showDropDown
								? { transform: "rotateX(180deg)" }
								: {}
						}
					></img>
				</picture>
			</div>
			{showDropDown && (
				<div className={styles.container}>
					<div
						className={styles.dropdownContainer}
					>
						<div className={styles.dropdown}>
							<h1>my wallet</h1>
							<span>address</span>
							<div
								className={
									styles.addressContainer
								}
							>
								<div>
									{shortAddressForModal(
										props.address
									)}
								</div>
								<picture
									className={styles.copyIcon}
									onClick={() =>
										CopyAddress(props.address)
									}
								>
									<img src="/copyIcon.svg"></img>
								</picture>
							</div>
							<TransactionList />
							<div
								className={styles.disconnect}
								onClick={props.disconnect()}
							>
								disconnect wallet
							</div>
						</div>
						{showSnackBar && (
							<div className={styles.snackbar}>
								copied
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

function shortAddressForModal(string: string) {
	if (string === undefined) return "unknown";
	return (
		string.substring(0, 23) +
		"..." +
		string.substring(string.length - 4)
	);
}
