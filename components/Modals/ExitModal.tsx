import styles from "../../styles/ExitModal.module.css";
export const ExitModal = (props: {
	leaveWithoutSaving: () => void;
	closeModal: () => void;
	handleClick: (e: any) => void;
}) => {
	const closeModal = (e: any) => {
		props.handleClick(e);
		props.closeModal();
	};
	return (
		<div className={styles.modal}>
			<div className={styles.menu}>
				<p className={styles.menu_title}>Leave Editor?</p>
				<p className={styles.menu_text}>
					You have unsaved changes! <br />
					Are you sure you want to leave this page?
				</p>
				<div className={styles.buttonContainer}>
					<div className={styles.exitButton} onClick={props.leaveWithoutSaving}>
						<u>leave without saving</u>
					</div>
					<div className={styles.cancelButton} onClick={closeModal}>
						cancel
					</div>
				</div>
			</div>
		</div>
	);
};
