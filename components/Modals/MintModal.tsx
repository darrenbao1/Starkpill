import Cross from "../../public/svgs/MintCross.svg";
import styles from "../../styles/MintModal.module.css";
import InformationIcon from "../../public/svgs/information.svg";
import SubtractIcon from "../../public/svgs/subtractIcon.svg";
import { createRef, useState } from "react";
import {
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import { getMintVariables } from "../../hooks/StarkPillContract";
import { BACKGROUND, FACE_TRAITS } from "../../types/constants";
export const MintModal = (props: {
	close: any;
	faceId: number;
	backgroundId: number;
}) => {
	const inputRef = createRef<HTMLInputElement>();
	const SubTotal = () => {
		const ingPrice = FACE_TRAITS[props.faceId].premiumPrice
			? FACE_TRAITS[props.faceId].premiumPrice!
			: 0;
		const bgPrice = BACKGROUND[props.backgroundId].premiumPrice
			? BACKGROUND[props.backgroundId].premiumPrice!
			: 0;
		//base mint price here
		const baseMint: number = 0.001;
		const [mintPrice, setMintPrice] = useState(0.0);
		const [hover, setHover] = useState(false);
		const { addTransaction } = useTransactionManager();
		const handleChange = (e: any) => {
			setMintPrice(Number(handleDecimalsOnValue(e.target.value)));
		};
		//set to limit to 3 decimal place
		function handleDecimalsOnValue(value: any) {
			const regex = /([0-9]*[\.|\,]{0,3}[0-9]{0,3})/s;
			return value.match(regex)[0];
		}
		//code to mint pill
		const mintVariables = getMintVariables(
			props.faceId,
			props.backgroundId,
			mintPrice + ingPrice + bgPrice + baseMint
		);
		const { execute: mintExecute } = useStarknetExecute({
			calls: mintVariables,
		});
		const mintPill = async () => {
			try {
				const response = await mintExecute();
				addTransaction({
					hash: response.transaction_hash,
					metadata: { transactionName: "Approve and Mint Pill" },
				});
				props.close();
			} catch (e) {
				console.log(e);
			}
		};
		return (
			<div className={styles.stepper}>
				<div
					className={styles.hoverTip}
					style={hover ? { visibility: "visible" } : { visibility: "hidden" }}>
					If you wish to support our efforts,
					<br /> you can choose to pay for your
					<br /> Starkpill in any amount of ETH.
				</div>
				<div className={styles.tipContainer}>
					<div
						className={styles.itemName}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						Tip&nbsp;
						<InformationIcon
							style={
								hover ? { background: "#FF4F0A", borderRadius: "7px" } : {}
							}
							onMouseEnter={() => setHover(true)}
							onMouseLeave={() => setHover(false)}
						/>
					</div>
					<div className={styles.stepperButtonContainer}>
						<div
							className={styles.stepperButton}
							onClick={() => {
								inputRef.current?.stepUp();
								setMintPrice(Number(inputRef.current?.value));
							}}>
							<SubtractIcon />
						</div>
						<div
							onClick={() => {
								inputRef.current?.stepDown();
								setMintPrice(Number(inputRef.current?.value));
							}}>
							<SubtractIcon style={{ transform: "scaleY(-1)" }} />
						</div>
					</div>
					<div className={styles.stepperContainer}>
						<input
							type="number"
							min={0}
							step={0.001}
							onChange={(e) => handleChange(e)}
							className={styles.textField}
							placeholder="0"
							ref={inputRef}></input>
						&nbsp; ETH
					</div>
				</div>
				<div className={styles.receiptContainer}>
					<div>
						Subtotal{" "}
						<span style={{ float: "right" }}>{ingPrice + bgPrice} ETH</span>
					</div>
					<div style={{ marginTop: "12px" }}>
						Base Mint <span style={{ float: "right" }}>{baseMint} ETH</span>
					</div>
					<div className={styles.total}>
						Total{" "}
						<span style={{ float: "right" }}>
							{(mintPrice + ingPrice + bgPrice + baseMint).toFixed(3)} ETH
						</span>
					</div>
					<div
						className={styles.mintButton}
						onClick={async () => {
							mintPill();
						}}>
						Mint
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className={styles.modalContainer}>
			<button className={styles.closeButton} onClick={props.close}>
				<Cross />
			</button>
			<div className={styles.header}>
				<span>Mint Summary</span>
			</div>
			<div className={styles.label}>Items</div>
			<div className={styles.itemsContainer}>
				<div className={styles.title}>Ingredient</div>
				<div className={styles.item}>
					<div className={styles.itemName}>
						{FACE_TRAITS[props.faceId].name}
					</div>
					<div className={styles.itemPrice}>
						{FACE_TRAITS[props.faceId].premiumPrice
							? FACE_TRAITS[props.faceId].premiumPrice + " ETH"
							: " - ETH"}
					</div>
				</div>
			</div>
			<div className={styles.itemsContainer}>
				<div className={styles.title}>Background</div>
				<div className={styles.item}>
					<div className={styles.itemName}>
						{BACKGROUND[props.backgroundId].name}
					</div>
					<div className={styles.itemPrice}>
						{BACKGROUND[props.backgroundId].premiumPrice
							? BACKGROUND[props.backgroundId].premiumPrice + " ETH"
							: " - ETH"}
					</div>
				</div>
			</div>
			<div className={styles.information}>
				All minted Starkpills will be listed and ranked on our leaderboard
			</div>
			<SubTotal />
		</div>
	);
};
