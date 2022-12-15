import Cross from "../../public/svgs/cross.svg";
import styles from "../../styles/MintModal.module.css";
import SubtractIcon from "../../public/svgs/subtractIcon.svg";
import AdditionIcon from "../../public/svgs/additionIcon.svg";
import { createRef, useState } from "react";
import {
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import { HasEnoughAllowance } from "../../hooks/GetEthAllowance";
import { getMintVariables } from "../../hooks/MintFunction";
import { getApproveVariables } from "../../hooks/ApproveFunction";
export const MintModal = (props: {
	close: any;
	faceId: number;
	backgroundId: number;
}) => {
	const inputRef = createRef<HTMLInputElement>();
	const Stepper = () => {
		const [mintPrice, setMintPrice] = useState(0.001);
		const { addTransaction } = useTransactionManager();
		const handleChange = (e: any) => {
			setMintPrice(handleDecimalsOnValue(e.target.value));
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
			mintPrice
		);
		const { execute: mintExecute } = useStarknetExecute({
			calls: mintVariables,
		});
		const mintPill = async () => {
			try {
				const response = await mintExecute();
				addTransaction({
					hash: response.transaction_hash,
					metadata: { test: "Mint Pill" },
				});
			} catch (e) {
				console.log(e);
			}
		};
		//function to let them approve eth
		const approveAllowance = async () => {
			try {
				const response = await approveAllowanceExecute();
				addTransaction({
					hash: response.transaction_hash,
					metadata: { test: "approve eth" },
				});
			} catch (e) {
				console.log(e);
			}
		};
		const { execute: approveAllowanceExecute } = useStarknetExecute({
			calls: getApproveVariables(mintPrice),
		});
		//boolean variable to check current approved balance
		let hasEnoughAllowance = HasEnoughAllowance(mintPrice);

		return (
			<>
				<div className={styles.stepper}>
					<button
						onClick={() => {
							inputRef.current?.stepDown();
							setMintPrice(Number(inputRef.current?.value));
						}}
						disabled={mintPrice == 0.001}
					>
						<SubtractIcon />
					</button>
					<div className={styles.inputContainer}>
						<input
							type="number"
							min={0.001}
							step={0.001}
							value={mintPrice}
							onChange={(e) => handleChange(e)}
							className={styles.mintPrice}
							placeholder="mint price"
							ref={inputRef}
						/>
						<span className={styles.unitOfMeasurement}>eth</span>
					</div>
					<button
						onClick={() => {
							inputRef.current?.stepUp();
							setMintPrice(Number(inputRef.current?.value));
						}}
					>
						<AdditionIcon />
					</button>
				</div>
				{hasEnoughAllowance ? (
					<div
						className="connectWalletButton"
						style={{
							width: "fit-content",
							padding: "1rem 2rem",
							marginTop: "30px",
							alignSelf: "center",
						}}
						onClick={() => {
							mintPill();
						}}
					>
						mint
					</div>
				) : (
					<div
						className="connectWalletButton"
						style={{
							width: "fit-content",
							padding: "1rem 2rem",
							margin: "30px auto",
							alignItems: "center",
						}}
						onClick={() => {
							approveAllowance();
						}}
					>
						approve eth
					</div>
				)}
			</>
		);
	};
	return (
		<div className={styles.modalContainer}>
			<div className={styles.header}>
				<span>mint</span>
				<button className={styles.closeButton} onClick={props.close}>
					<Cross />
				</button>
			</div>
			<div className={styles.text}>
				if you wish to support our efforts you can choose pay for your Starkpill
				in any amount of ETH.
				<br />
				<br />
				All minted Starkpills will be listed as a collection in our cabinet.
			</div>
			<Stepper />
		</div>
	);
};
