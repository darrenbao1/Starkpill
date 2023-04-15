import {
	useTransactionManager,
	useTransactionReceipt,
} from "@starknet-react/core";
import styles from "./Toast.module.css";
import { useCallback, useEffect, useState } from "react";
import Completed from "../../public/svgs/Completed.svg";
import Pending from "../../public/svgs/Pending.svg";
import Failed from "../../public/svgs/Failed.svg";
import Cross from "../../public/svgs/cross3.svg";
import { useDispatch } from "react-redux";
import { increment } from "../../features/refetch";
import { IS_TESTNET } from "../../types/constants";
export const Toast = () => {
	const { hashes } = useTransactionManager();
	return (
		<>
			<div className={styles.notificationContainer}>
				{hashes.map((hash, index) => (
					<ToastObj key={index} hash={hash} />
				))}
			</div>
		</>
	);
};
const ToastObj = (props: { hash: string }) => {
	const dispatch = useDispatch();
	const { data } = useTransactionReceipt({ hash: props.hash, watch: true });
	const [isShown, setIsShown] = useState(false);
	const [txStatus, setTxStatus] = useState("");
	const [statusText, setStatusText] = useState("");
	const [statusColor, setStatusColor] = useState("#FFFBEF");
	const changeState = useCallback(
		(status: string | undefined) => {
			if (status == undefined) {
			} else {
				if (status == "RECEIVED") {
					setIsShown(true);
					setTxStatus("Pending");
					setStatusText("Pending wallet transaction");
					setStatusColor("#FFFBEF");
					setTimeout(() => setIsShown(false), 7000);
				}
				if (status == "ACCEPTED_ON_L2") {
					setIsShown(true);
					setTxStatus("Success");
					setStatusColor("#EFFFFB");
					setStatusText("Invoked successfully");
					dispatch(increment());
					setTimeout(() => setIsShown(false), 7000);
				}
				if (status == "REJECTED") {
					setIsShown(true);
					setTxStatus("Failed");
					setStatusColor("#FFEFEF");
					setStatusText(
						"Sorry, we are unable to proceed with your request, please try again later."
					);
					setTimeout(() => setIsShown(false), 7000);
				}
			}
		},
		[dispatch, setIsShown, setTxStatus, setStatusColor, setStatusText]
	);
	useEffect(() => {
		changeState(data?.status);
	}, [data?.status, changeState]);

	return (
		<>
			{isShown && data && (
				<div className={styles.toast} style={{ background: statusColor }}>
					<div className={styles.image}>
						{txStatus == "Success" && <Completed />}
						{txStatus == "Pending" && <Pending />}
						{txStatus == "Failed" && <Failed />}
					</div>
					<div className={styles.title}>
						<div>{statusText}</div>
						{txStatus == "Pending" && (
							<div className={styles.message}>
								<a
									href={
										`https://${IS_TESTNET ? "testnet." : ""}starkscan.co/tx/` +
										props.hash
									}
									target="_blank"
									rel="noreferrer">
									<u style={{ color: "#DD2839" }}>View Transaction</u>
								</a>
							</div>
						)}
					</div>

					<button onClick={() => setIsShown(false)}>
						<Cross />
					</button>
				</div>
			)}
		</>
	);
};
