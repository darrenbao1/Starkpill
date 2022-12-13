import Cross from "../../public/svgs/cross.svg";
import styles from "../../styles/MintModal.module.css";
import SubtractIcon from "../../public/svgs/subtractIcon.svg";
import AdditionIcon from "../../public/svgs/additionIcon.svg";
import { createRef, useState } from "react";
import { FACE_TRAITS, BACKGROUND } from "../../types/constants";
export const MintModal = (props: {
	close: any;
	faceId: number;
	backgroundId: number;
}) => {
	const inputRef = createRef<HTMLInputElement>();
	const Stepper = () => {
		const [mintPrice, setMintPrice] = useState(0.1);
		const handleChange = (e: any) => {
			setMintPrice(handleDecimalsOnValue(e.target.value));
		};

		//set to limit to 1 decimal place
		function handleDecimalsOnValue(value: any) {
			const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,1})/s;
			return value.match(regex)[0];
		}
		return (
			<div className={styles.stepper}>
				<button
					onClick={() => {
						inputRef.current?.stepDown();
						setMintPrice(Number(inputRef.current?.value));
					}}
					disabled={mintPrice == 0.1}
				>
					<SubtractIcon />
				</button>
				<div className={styles.inputContainer}>
					<input
						type="number"
						min={0.1}
						step={0.1}
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
		);
	};
	return (
		<div className={styles.modalContainer}>
			<button className={styles.closeButton} onClick={props.close}>
				<Cross />
			</button>
			<div className={styles.header}>mint</div>
			<div className={styles.text}>
				if you wish to support our efforts you can choose pay for your Starkpill
				in any amount of ETH.
				<br />
				<br />
				All minted Starkpills will be listed as a collection in our cabinet.
			</div>
			<Stepper />
			<div
				className="connectWalletButton"
				style={{
					width: "fit-content",
					padding: "1rem 2rem",
					marginTop: "30px",
				}}
				onClick={() => {
					//TODO mint button here
					alert(
						"Mint Price:" +
							inputRef.current?.value +
							" Face Trait: " +
							FACE_TRAITS[props.faceId - 1].name +
							" Background Trait: " +
							BACKGROUND[props.backgroundId - 1].name
					);
				}}
			>
				mint
			</div>
		</div>
	);
};
