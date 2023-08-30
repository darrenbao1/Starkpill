import {
	ModalContainer,
	Menu,
	Button,
	WalletLinks,
	ButtonIcon,
	CloseButton,
	MenuTitle,
	CrossIcon,
} from "./ConnectMenuModal.styles";
import { useConnectors } from "@starknet-react/core";
import { NoInstalledWalletModal } from "../NoInstalledWalletModal/NoInstalledWalletModal";
import { useEffect, useRef } from "react";
import { login } from "../../../types/utils";

function ConnectMenuModal(props: { connectors: any; close: any }) {
	const { connect } = useConnectors();
	let loginWallet = async (connector: any) => {
		console.log(connector._wallet.selectedAddress);
		connect(connector);
		const res = await login(connector._wallet.selectedAddress);
		console.log(res);
		props.close();
	};
	function useOutsideAlerter(ref: any) {
		useEffect(() => {
			function handleClickOutside(event: any) {
				if (ref.current && !ref.current.contains(event.target)) {
					props.close();
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

	return (
		<ModalContainer>
			<Menu ref={wrapperRef}>
				{props.close && (
					<CloseButton
						onClick={() => {
							props.close();
						}}>
						<CrossIcon />
					</CloseButton>
				)}
				<MenuTitle>
					<p>Connect wallet</p>
				</MenuTitle>
				<WalletLinks>
					{props.connectors.map((connector: any, index: any) => (
						<Button onClick={() => loginWallet(connector)} key={index}>
							<p>{connector._wallet.name}</p>
							<picture>
								<ButtonIcon
									src={
										connector._wallet.icon == ""
											? "/argent-logo.png"
											: connector._wallet.icon
									}
									alt=""
								/>
							</picture>
						</Button>
					))}

					{/* <p>
						By connecting, I accept Starkpill&apos;s{" "}
						<text>Terms of Service</text>
					</p> */}
					{props.connectors.length === 0 && <NoInstalledWalletModal />}
				</WalletLinks>
			</Menu>
		</ModalContainer>
	);
}
export default ConnectMenuModal;
