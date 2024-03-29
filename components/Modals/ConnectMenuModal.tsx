import { useConnectors } from "@starknet-react/core";
import styles from "../../styles/ConnectMenuModal.module.css";
import Cross from "../../public/svgs/cross.svg";
import { NoInstalledWalletModal } from "./NoInstalledWalletModal";
import { useEffect, useRef } from "react";
function ConnectMenuModal(props: { connectors: any; close: any }) {
	const { connect } = useConnectors();
	let loginWallet = async (connector: any) => {
		connect(connector);
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
		<div className={styles.modal}>
			<div className={styles.menu} ref={wrapperRef}>
				{props.close && (
					<button
						className={styles.menu_close}
						onClick={() => {
							props.close();
						}}>
						<Cross />
					</button>
				)}
				<p className={styles.menu_title}>Connect wallet</p>
				<div className={styles.wallet_links} style={{ marginTop: "10px" }}>
					{props.connectors.map((connector: any, index: any) => (
						<button
							key={index}
							className={styles.button}
							onClick={() => loginWallet(connector)}>
							<picture>
								<img
									className={styles.button_icon}
									src={
										connector._wallet.icon == ""
											? "/argent-logo.png"
											: connector._wallet.icon
									}
									alt=""
								/>
							</picture>
							<p className={styles.button_text}>
								Connect to {connector._wallet.name}
							</p>
						</button>
					))}
					{props.connectors.length === 0 && <NoInstalledWalletModal />}
				</div>
			</div>
		</div>
	);
}
export default ConnectMenuModal;
