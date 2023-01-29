import styles from "../../styles/SaveModal.module.css";
import Cross from "../../public/svgs/cross.svg";
export const SaveModal = (props: {
	close: () => void;
	handleClick?: (e: any) => void;
}) => {
	return (
		<div className={styles.modalContainer} onClick={props.handleClick}>
			<div className={styles.header}>
				<span>select </span>
				<button className={styles.closeButton} onClick={props.close}>
					<Cross />
				</button>
			</div>
		</div>
	);
};
