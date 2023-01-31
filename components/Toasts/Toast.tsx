import {
	useTransactionManager,
	useTransactionReceipt,
} from "@starknet-react/core";
import styles from "./Toast.module.css";
import { useEffect, useState } from "react";
import { shortenAddress } from "../../types/utils";
import Completed from "../../public/svgs/Completed.svg";
import Pending from "../../public/svgs/Pending.svg";
import Failed from "../../public/svgs/Failed.svg";
import { useDispatch } from "react-redux";
import { increment } from "../../features/refetch";
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
	const [statusColor, setStatusColor] = useState("yellow");
	const changeState = (status: string | undefined) => {
		if (status == undefined) {
		} else {
			if (status == "RECEIVED") {
				setIsShown(true);
				setTxStatus("Pending");
				setStatusColor("yellow");
				setTimeout(() => setIsShown(false), 7000);
			}
			if (status == "ACCEPTED_ON_L2") {
				setIsShown(true);
				setTxStatus("Success");
				setStatusColor("green");
				dispatch(increment());
				setTimeout(() => setIsShown(false), 7000);
			}
			if (status == "REJECTED") {
				setIsShown(true);
				setTxStatus("Failed");
				setStatusColor("red");
				setTimeout(() => setIsShown(false), 7000);
			}
		}
	};
	useEffect(() => {
		changeState(data?.status);
	}, [data?.status]);

	return (
		<>
			{isShown && data && (
				<div
					className={styles.toast}
					style={{ borderLeft: "3px solid " + statusColor }}
				>
					<div className={styles.image}>
						{txStatus == "Success" && <Completed />}
						{txStatus == "Pending" && <Pending />}
						{txStatus == "Failed" && <Failed />}
					</div>
					<div className={styles.title}>
						<div>{txStatus}</div>
						<div>{shortenAddress(props.hash)}</div>
					</div>
					<div className={styles.message}>
						<a
							href={"https://testnet.starkscan.co/tx/" + props.hash}
							target="_blank"
							rel="noreferrer"
						>
							<u>View Transaction</u>
						</a>
					</div>
					<button
						onClick={() => setIsShown(false)}
						style={{ marginLeft: "15px" }}
					>
						X
					</button>
				</div>
			)}
		</>
	);
};
