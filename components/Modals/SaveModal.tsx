import styles from "../../styles/SaveModal.module.css";
import Cross from "../../public/svgs/saveModalCross.svg";
import { Trait } from "../../types/interfaces";
import Image from "next/image";
import { BACKGROUND, FACE_TRAITS, IMAGE_ENDPOINT } from "../../types/constants";
export const SaveModal = (props: {
	close: () => void;
	handleClick: (e: any) => void;
	saveChanges: () => void;
	unEquipArray: Trait[];
	equipArray: Trait[];
	tokenId: number;
	oldImage: string;
	oldIng: number;
	oldBg: number;
	newIng: number;
	newBg: number;
}) => {
	const { close, saveChanges, handleClick, unEquipArray, equipArray, tokenId } =
		props;
	function formatNumber(num: number) {
		return num.toString().padStart(3, "0");
	}
	return (
		<div className={styles.modalContainer} onClick={handleClick}>
			<div className={styles.header}>
				<span>Edit Summary </span>
				<button
					className={styles.closeButton}
					onClick={close}
					style={{ marginTop: "5px" }}>
					<Cross />
				</button>
			</div>
			<div className={styles.content}>
				<div style={{ fontSize: "34px", marginBottom: "12px" }}>
					Starkpill #{tokenId}
				</div>
				<div
					className={styles.itemContainer}
					style={{ borderBottom: "2px solid #29296E" }}>
					<Image
						width={100}
						height={100}
						style={{
							borderRadius: "5px",
							margin: "auto 0",
						}}
						src={props.oldImage}
						alt="current pill"></Image>

					<div className={styles.itemStats}>
						<div className={styles.itemTitle}>Old:</div>
						<span> - {FACE_TRAITS[props.oldIng].name}</span>
						<span> - {BACKGROUND[props.oldBg].name}</span>
					</div>
				</div>
				<div className={styles.itemContainer} style={{ marginBottom: "15px" }}>
					<Image
						width={100}
						height={100}
						style={{
							borderRadius: "5px",
							margin: "auto 0",
						}}
						src={
							IMAGE_ENDPOINT +
							formatNumber(props.newIng) +
							formatNumber(props.newBg) +
							".png"
						}
						alt="new pill"></Image>

					<div className={styles.itemStats}>
						<div className={styles.itemTitle}>New:</div>
						<span> - {FACE_TRAITS[props.newIng].name}</span>
						<span> - {BACKGROUND[props.newBg].name}</span>
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<div
					className={styles.saveButton}
					onClick={() => {
						handleClick;
						saveChanges();
					}}>
					Confirm Edits
				</div>
			</div>
		</div>
	);
};
