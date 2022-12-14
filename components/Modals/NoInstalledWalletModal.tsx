import styles from "../../styles/ConnectMenuModal.module.css";
export const NoInstalledWalletModal = () => {
	return (
		<>
			<p className={styles.menu_text}>
				<b> *You do not have any compatible wallets installed </b>
			</p>
			<a
				className={styles.button}
				href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb"
				target="_blank"
				rel="noreferrer"
			>
				<picture>
					<img className={styles.button_icon} src="/argent-logo.png" alt="" />
				</picture>
				<p className={styles.button_text}>Install Argent X</p>
			</a>
			<a
				className={styles.button}
				href="https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma"
				target="_blank"
				rel="noreferrer"
			>
				<picture>
					<img className={styles.button_icon} src="/braavos-logo.png" alt="" />
				</picture>
				<p className={styles.button_text}>Install Braavos</p>
			</a>
		</>
	);
};
