import Cross from "../../public/svgs/cross2.svg";
import styles from "../../styles/MintModal.module.css";
import InformationIcon from "../../public/svgs/information.svg";
import SubtractIcon from "../../public/svgs/subtractIcon.svg";
import { createRef, useEffect, useRef, useState } from "react";
import { useContractWrite, useTransactionManager } from "@starknet-react/core";
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
		const { writeAsync: mintExecute } = useContractWrite({
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
		const ref = useRef(null);
		useOnClickOutside(ref, () => setHover(false));
		// Hook
		function useOnClickOutside(ref: any, handler: any) {
			useEffect(
				() => {
					const listener = (event: any) => {
						// Do nothing if clicking ref's element or descendent elements
						if (!ref.current || ref.current.contains(event.target)) {
							return;
						}
						handler(event);
					};
					document.addEventListener("mousedown", listener);
					document.addEventListener("touchstart", listener);
					return () => {
						document.removeEventListener("mousedown", listener);
						document.removeEventListener("touchstart", listener);
					};
				},
				// Add ref and handler to effect dependencies
				// It's worth noting that because passed in handler is a new ...
				// ... function on every render that will cause this effect ...
				// ... callback/cleanup to run every render. It's not a big deal ...
				// ... but to optimize you can wrap handler in useCallback before ...
				// ... passing it into this hook.
				[ref, handler]
			);
		}
		return (
			<div className={styles.stepper}>
				<div className={styles.tipContainer}>
					<div
						className={styles.itemName}
						ref={ref}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						Tip&nbsp;
						<InformationIcon
							style={
								hover
									? {
											background: "#FF4F0A",
											borderRadius: "7px",
											marginTop: "10px",
									  }
									: { marginTop: "10px" }
							}
							onClick={() => setHover(!hover)}
						/>
						{hover && (
							<div className={styles.hoverTip}>
								If you wish to support our efforts, you can choose to pay for
								your Starkpill in any amount of ETH.
							</div>
						)}
					</div>
					<div className={styles.stepperButtonContainer}>
						<div
							className={styles.stepperButton}
							style={{ borderBottom: "1px solid #35358f" }}
							onClick={() => {
								inputRef.current?.stepUp();
								setMintPrice(Number(inputRef.current?.value));
							}}>
							<SubtractIcon />
						</div>
						<div
							className={styles.stepperButton}
							style={{ borderTop: "1px solid #35358f" }}
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
							placeholder="0.00"
							ref={inputRef}></input>
						<span style={{ marginLeft: "5px" }}>ETH</span>
					</div>
				</div>
				<div className={styles.receiptContainer}>
					<div style={{ marginTop: "4px" }}>
						<div>
							Subtotal{" "}
							<span style={{ float: "right", fontSize: "24px" }}>
								{ingPrice + bgPrice}{" "}
								<span style={{ fontSize: "20px" }}>ETH</span>
							</span>
						</div>
						<div style={{ marginTop: "12px" }}>
							Base Mint{" "}
							<span style={{ float: "right", fontSize: "24px" }}>
								{baseMint} <span style={{ fontSize: "20px" }}>ETH</span>
							</span>
						</div>
					</div>
					<div className={styles.total}>
						Total
						<span style={{ float: "right" }}>
							{(mintPrice + ingPrice + bgPrice + baseMint).toFixed(3)}{" "}
							<span style={{ fontSize: "28px" }}>ETH</span>
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
					<div
						className={styles.itemPrice}
						style={{ display: "flex", alignItems: "flex-end" }}>
						{FACE_TRAITS[props.faceId].premiumPrice ? (
							<span style={{ fontSize: "32px" }}>
								{FACE_TRAITS[props.faceId].premiumPrice}{" "}
								<span style={{ fontSize: "24px" }}>ETH</span>
							</span>
						) : (
							<span style={{ fontSize: "24px" }}>- ETH</span>
						)}
					</div>
				</div>
			</div>
			<div className={styles.itemsContainer}>
				<div className={styles.title}>Background</div>
				<div className={styles.item}>
					<div className={styles.itemName}>
						{BACKGROUND[props.backgroundId].name}
					</div>
					<div
						className={styles.itemPrice}
						style={{ display: "flex", alignItems: "flex-end" }}>
						{BACKGROUND[props.backgroundId].premiumPrice ? (
							<span style={{ fontSize: "32px" }}>
								{BACKGROUND[props.backgroundId].premiumPrice}{" "}
								<span style={{ fontSize: "24px" }}>ETH</span>
							</span>
						) : (
							<span style={{ fontSize: "24px" }}>- ETH</span>
						)}
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
