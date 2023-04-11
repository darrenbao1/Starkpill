import styles from "../../styles/ImageModal.module.css";
import Image from "next/image";
import Cross from "../../public/svgs/cross2.svg";
import { useState } from "react";
import {
	BACKGROUND,
	FACE_TRAITS,
	GET_ALL_TOKENS_BY_LATEST,
} from "../../types/constants";
import { useRef, useEffect } from "react";

interface Props {
	imageUrl: string;
	tokenId: string;
	close: () => void;
	ingImageId: number;
	bgImageId: number;
	rank: number;
	ownerAddress: string;
}
export const ImageModal = (props: Props) => {
	const [fameValue, setFameValue] = useState(0);

	const decrement = () => {
		if (fameValue > 0) {
			setFameValue((prevValue) => prevValue - 1);
		}
	};

	const increment = () => {
		setFameValue((prevValue) => prevValue + 1);
	};

	const handleChange = (event) => {
		setFameValue(parseInt(event.target.value));
	};
	const {
		imageUrl,
		tokenId,
		close,
		ingImageId,
		bgImageId,
		rank,
		ownerAddress,
	} = props;
	const isTop3 = rank <= 3 && rank > 0;
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
						{/* rank container */}
						{rank != 0 && (
							<div className={styles.captionBox}>
								<div className={styles.contentHeader}>Cabinet ranking</div>
								<div className={styles.contentValue}>#{rank}</div>
							</div>
						)}
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
							<div className={styles.contentValue}></div>
							{}
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
							<div className={styles.contentValue}>-12</div>
						</div>
					</div>
					<div className={styles.fameRadioButtonContainer}>
						<label>
							<input type="radio" value={0} />
						</label>
						Fame
						<label>
							<input type="radio" value={0} />
						</label>
						Defame
					</div>
					<div className={styles.captionBox}>
						<div className={styles.contentHeader}>Fame</div>
						<div className={styles.addFameButtonContainer}>
							<button className={styles.stepperButton} onClick={decrement}>
								-
							</button>
							<input
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
						<span className={styles.remainderFame}>4</span>
					</div>

					{/* TODO FAME BUTTONS */}
					{/* <div className={styles.fameContainer}>
						
						<div className={styles.buttonContainer}>
							<div className={styles.defameButton}> - Defame </div>
							<div className={styles.fameButton}> + Fame </div>
						</div>
						<div>
							<span style={{ fontSize: "24px" }}>Your balance:</span>
							<span className={styles.remainderFame}>4</span>
						</div>
					</div> */}
					<div className={styles.buttonWrapper}>
						<button className={styles.confirmButton}>Confirm</button>
					</div>
				</div>

				<div className={styles.close} onClick={close}>
					<Cross />
				</div>
			</div>
		</div>
	);
};
