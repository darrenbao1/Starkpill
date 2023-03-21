import styles from "../../styles/ImageModal.module.css";
import Image from "next/image";
import Cross from "../../public/svgs/cross2.svg";
import { BACKGROUND, FACE_TRAITS } from "../../types/constants";
import { useRef, useEffect } from "react";
interface Props {
	imageUrl: string;
	tokenId: string;
	close: () => void;
	ingImageId: number;
	bgImageId: number;
	rank: number;
}
export const ImageModal = (props: Props) => {
	const { imageUrl, tokenId, close, ingImageId, bgImageId, rank } = props;
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
						<div className={styles.pillHeader}>
							TestPill #{tokenId}
							{isTop3 && (
								<Image
									src={"/svgs/medal" + props.rank + ".svg"}
									alt=""
									width={40}
									height={40}
									style={{ marginLeft: "12px" }}></Image>
							)}
						</div>
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
						{/* background container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Background</div>
							<div className={styles.contentValue}>
								{BACKGROUND[bgImageId].name}
							</div>
						</div>
						{/* TODO yet to implement fame */}
						{/* <div className={styles.captionBox}>
							<div className={styles.contentHeader}>Fame</div>
							<div className={styles.contentValue}>-12</div>
						</div> */}
					</div>
					{/* TODO FAME BUTTONS */}
					{/* <div className={styles.fameContainer}>
						<div>
							<span style={{ fontSize: "24px" }}>Your balance:</span>
							<span className={styles.remainderFame}>4</span>
						</div>
						<div className={styles.buttonContainer}>
							<div className={styles.defameButton}> - Defame </div>
							<div className={styles.fameButton}> + Fame </div>
						</div>
					</div> */}
				</div>
				<div className={styles.close} onClick={close}>
					<Cross />
				</div>
			</div>
		</div>
	);
};
