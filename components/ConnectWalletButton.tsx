import { useAccount, useConnectors } from "@starknet-react/core";
import { useEffect, useRef, useState } from "react";
import { shortAddressForModal, shortenAddress } from "../types/utils";
import ConnectMenuModal from "./Modals/ConnectMenuModal/ConnectMenuModal";
import styles from "../styles/ConnectWalletButton.module.css";
import { TransactionList } from "./TransactionList";
import { UserBalance } from "../hooks/StarkEthContract";
export const ConnectWalletButton = () => {
	const { account, address } = useAccount();
	const { available, refresh, disconnect } = useConnectors();
	const [showConnectMenuModal, setShowConnectMenuModal] = useState(false);

	//useEffect to check the available wallet user has installed
	useEffect(() => {
		const interval = setInterval(refresh, 5000);
		return () => clearInterval(interval);
	}, [refresh]);
	return (
		<>
			{!account ? (
				<div
					className={styles.connectWalletText}
					onClick={() => setShowConnectMenuModal(true)}>
					Connect Wallet
				</div>
			) : (
				<ConnectedButton address={address!} disconnect={disconnect} />
			)}
			{showConnectMenuModal ? (
				<ConnectMenuModal
					connectors={available}
					close={() => setShowConnectMenuModal(false)}
				/>
			) : null}
		</>
	);
};

const ConnectedButton = (props: { address: string; disconnect: any }) => {
	function useOutsideAlerter(ref: any) {
		useEffect(() => {
			function handleClickOutside(event: any) {
				if (ref.current && !ref.current.contains(event.target)) {
					setShowDropDown(false);
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	const [showDropDown, setShowDropDown] = useState(false);
	const [showSnackBar, setShowSnackBar] = useState(false);
	const CopyAddress = (walletAddress: string) => {
		navigator.clipboard.writeText(walletAddress);
		setShowSnackBar(true);
		setTimeout(() => setShowSnackBar(false), 1000);
	};

	return (
		<div ref={wrapperRef}>
			<div
				className={styles.connectWalletText}
				onClick={() => setShowDropDown(!showDropDown)}>
				{shortenAddress(props.address)} &nbsp;{" "}
				<picture>
					<img
						src="/downArrow.svg"
						alt=""
						style={showDropDown ? { transform: "rotateX(180deg)" } : {}}
						className={styles.downArrow}></img>
				</picture>
			</div>
			{showDropDown && (
				<div className={styles.container}>
					<div className={styles.dropdownContainer}>
						<div className={styles.dropdown}>
							<h1>My Wallet</h1>
							<span style={{ fontSize: "1.5em", fontWeight: "400" }}>
								Address
							</span>
							<div className={styles.addressContainer}>
								<div>{shortAddressForModal(props.address)}</div>
								<picture
									className={styles.copyIcon}
									onClick={() => CopyAddress(props.address)}
									style={{ marginTop: "5px" }}>
									<img src="/copyIcon.svg" alt=""></img>
								</picture>
							</div>
							<TransactionList />
							<div
								className={styles.addressContainer}
								style={{ marginBottom: "20px", fontSize: "20px" }}>
								<div>Eth Balance</div>
								<div className={styles.copyIcon}>
									{UserBalance && <UserBalance />}
								</div>
							</div>
							<div className={styles.disconnect} onClick={props.disconnect}>
								Disconnect Wallet
							</div>
						</div>
						{showSnackBar && (
							<div className="snackbar">Wallet address copied</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
