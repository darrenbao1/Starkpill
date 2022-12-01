import { useConnectors } from "@starknet-react/core";
import styles from "../../styles/ConnectMenuModal.module.css";
function ConnectMenuModal(props: {
	connectors: any;
	close: any;
}) {
	const { connect } = useConnectors();
	let loginWallet = async (connector: any) => {
		connect(connector);
		props.close();
	};
	return (
		<div className={styles.modal}>
			<div className={styles.menu}>
				{props.close ? (
					<button
						className={styles.menu_close}
						onClick={() => {
							props.close();
						}}
					>
						<svg viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				) : null}
				<p className={styles.menu_title}>
					Connect wallet
				</p>
				{props.connectors.length === 0 && (
					<p className={styles.menu_text}>
						<b>
							{" "}
							*You do not have any compatible
							wallets installed{" "}
						</b>
					</p>
				)}
				<div
					className={styles.wallet_links}
					style={{ marginTop: "10px" }}
				>
					{props.connectors.map(
						(connector: any, index: any) => (
							<button
								key={index}
								className={styles.button}
								onClick={() =>
									loginWallet(connector)
								}
							>
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
									Connect to{" "}
									{connector._wallet.name}
								</p>
							</button>
						)
					)}
					{props.connectors.length === 0 && (
						<>
							<a
								className={styles.button}
								href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb"
								target="_blank"
								rel="noreferrer"
							>
								<picture>
									<img
										className={styles.button_icon}
										src="/argent-logo.png"
										alt=""
									/>
								</picture>
								<p className={styles.button_text}>
									Install Argent X
								</p>
							</a>
							<a
								className={styles.button}
								href="https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma"
								target="_blank"
								rel="noreferrer"
							>
								<picture>
									<img
										className={styles.button_icon}
										src="/braavos-logo.png"
										alt=""
									/>
								</picture>
								<p className={styles.button_text}>
									Install Braavos
								</p>
							</a>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
export default ConnectMenuModal;
