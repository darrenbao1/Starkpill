import { useTransactionManager, useTransactions } from "@starknet-react/core";
import styles from "./Toast.module.css";
export const Toast = () => {
	const { hashes, addTransaction } = useTransactionManager();
	const transactions = useTransactions({ hashes });
	return (
		<div className={styles.notificationContainer}>
			<div className={styles.toast}>
				<button>X</button>
				<div className={styles.image}>
					<img src="/argent-logo.png" alt=""></img>
				</div>
				<div className={styles.title}>title here</div>
				<div className={styles.message}>message here</div>
			</div>
		</div>
	);
};
