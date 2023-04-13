import styles from "../../styles/ImageModal.module.css";
import Image from "next/image";
import Cross from "../../public/svgs/cross2.svg";
import { useState } from "react";
import { BACKGROUND, FACE_TRAITS } from "../../types/constants";
import { useRef, useEffect } from "react";
import { shortenAddress } from "../../types/utils";

interface Props {
	imageUrl: string;
	tokenId: string;
	close: () => void;
	ingImageId: number;
	bgImageId: number;
	fame: number;
	ownerAddress: string;
	getVotingPower: number;
}
export const ImageModal = (props: Props) => {
	const [fameValue, setFameValue] = useState(0);
	const [radioButtonIsSelected, setRadioButtonIsSelected] = useState(false); // this is the state that will be used to determine whether the fame or defame radio button is selected
	const [selectedRadioButton, setSelectedRadioButton] = useState(""); //this is the state that will be used to determine whether the fame or defame radio button is selected

	let fameBalanceDisplay = props.getVotingPower - fameValue; //Display current fame balance left after - value in input box
	const decrement = () => {
		if (fameValue > 0) {
			setFameValue((prevValue) => prevValue - 1);
		}
	};

	const increment = () => {
		setFameValue((prevValue) => prevValue + 1);
	};

	const handleChange = (event: any) => {
		setSelectedRadioButton(event.target.id);
		setRadioButtonIsSelected(true);
		setFameValue(parseInt(event.target.value));
	};
	const { imageUrl, tokenId, close, ingImageId, bgImageId } = props;
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && event.target === modalRef.current) {
				close();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [close]);
	return (
		<div ref={modalRef} className={styles.modal}>
			<div className={styles.container}>
				<Image
					src={imageUrl}
					className={styles.modal_content}
					alt={"TestPill #" + tokenId}
					width={500}
					height={500}
					priority={true}
					blurDataURL="/Base_StarkPill.png"
					placeholder="blur"
				/>
				<div className={styles.caption}>
					<div className={styles.captionContainer}>
						<div className={styles.pillHeader}>TestPill #{tokenId}</div>
						{/* ingredient container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Ingredient</div>
							<div className={styles.contentValue}>
								{FACE_TRAITS[ingImageId].name}
							</div>
						</div>
						{/* Owned by container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Owned by: </div>
							<div className={styles.contentValue}>
								{shortenAddress(props.ownerAddress)}
							</div>
						</div>
						{/* background container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Background</div>
							<div className={styles.contentValue}>
								{BACKGROUND[bgImageId].name}
							</div>
						</div>
						{/*Fame Container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Fame</div>
							<div className={styles.contentValue}>{props.fame}</div>
						</div>
					</div>
					<div className={styles.fameRadioButtonContainer}>
						<label className={styles.radioLabel}>
							<input
								className={styles.radioInput}
								type="radio"
								value={0}
								name="fameradio"
								id="fame"
								onChange={handleChange}
								checked={selectedRadioButton === "fame"}
							/>
							<span className={styles.customRadio} />
						</label>
						Fame
						<label>
							<input
								className={styles.radioInput}
								type="radio"
								value={0}
								name="fameradio"
								id="defame"
								onChange={handleChange}
								checked={selectedRadioButton === "defame"}
							/>
							<span className={styles.customRadio} />
						</label>
						Defame
					</div>
					{radioButtonIsSelected ? (
						<>
							<div className={styles.captionBox}>
								<div className={styles.contentHeader}></div>
								{selectedRadioButton === "fame" ? "Fame" : "Defame"}
								<div className={styles.addFameButtonContainer}>
									<button className={styles.stepperButton} onClick={decrement}>
										-
									</button>
									<input
										// max={props.getVotingPower}

										type="number"
										className={styles.textField}
										value={fameValue}
										onChange={handleChange}></input>

									<button className={styles.stepperButton} onClick={increment}>
										+
									</button>
								</div>
								<div className={styles.contentValue}></div>
							</div>
							<div className={styles.yourBalance}>
								<span style={{ fontSize: "24px" }}>Your balance:</span>
								<span className={styles.remainderFame}>
									{fameBalanceDisplay}
								</span>
							</div>
							<div className={styles.buttonWrapper}>
								<button className={styles.confirmButton}>Confirm</button>
							</div>
						</>
					) : null}

					<div className={styles.close} onClick={close}>
						<Cross />
					</div>
				</div>
			</div>
		</div>
	);
};
