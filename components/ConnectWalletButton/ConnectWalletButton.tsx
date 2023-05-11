import {
	AddressContainer,
	ConnectWalletText,
	Container,
	Copy,
	DownArrow,
	Dropdown,
	DropdownContainer,
	Disconnect,
	EthBalanceContainer,
} from "./ConnectWalletButton.styles";
import { useAccount, useConnectors } from "@starknet-react/core";
import ConnectMenuModal from "../Modals/ConnectMenuModal/ConnectMenuModal";
import { useEffect, useRef, useState } from "react";
import { shortAddressForModal, shortenAddress } from "../../types/utils";
import { UserBalance } from "../../hooks/StarkEthContract";
import { TransactionList } from "../TransactionList";

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
				<ConnectWalletText onClick={() => setShowConnectMenuModal(true)}>
					Connect Wallet
				</ConnectWalletText>
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
			<ConnectWalletText onClick={() => setShowDropDown(!showDropDown)}>
				{shortenAddress(props.address)} &nbsp;{" "}
				<picture>
					<DownArrow src="/downArrow.svg" alt="" showDropDown={showDropDown} />
				</picture>
			</ConnectWalletText>
			{showDropDown && (
				<Container>
					<DropdownContainer>
						<Dropdown>
							<h1>My Wallet</h1>
							<span>Address</span>
							<AddressContainer>
								<div>{shortAddressForModal(props.address)}</div>
								<picture onClick={() => CopyAddress(props.address)}>
									<img src="/copy.svg" alt="" />
								</picture>
							</AddressContainer>
							<TransactionList />
							<EthBalanceContainer>
								<div>Eth Balance</div>
								<Copy>{UserBalance && <UserBalance />}</Copy>
							</EthBalanceContainer>
							<Disconnect onClick={props.disconnect}>
								Disconnect Wallet
							</Disconnect>
						</Dropdown>
						{showSnackBar && (
							<div className="snackbar">Wallet address copied</div>
						)}
					</DropdownContainer>
				</Container>
			)}
		</div>
	);
};
