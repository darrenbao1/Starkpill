import styles from "../../styles/SaveModal.module.css";
import Cross from "../../public/svgs/cross.svg";
import { Trait } from "../../types/interfaces";
export const SaveModal = (props: {
	close: () => void;
	handleClick: (e: any) => void;
	saveChanges: () => void;
	unEquipArray: Trait[];
	equipArray: Trait[];
	tokenId: number;
}) => {
	const { close, saveChanges, handleClick, unEquipArray, equipArray, tokenId } =
		props;
	return (
		<div className={styles.modalContainer} onClick={handleClick}>
			<div className={styles.header}>
				<span>edit summary </span>
				<button className={styles.closeButton} onClick={close}>
					<Cross />
				</button>
			</div>
			<div className={styles.content}>
				<h2>Starkpill #{tokenId}</h2>
				{unEquipArray.length > 0 && (
					<>
						<h2>Remove: </h2>
						<ul>
							{unEquipArray.map((trait) => (
								<li key={trait.tokenId}>
									- &nbsp; {trait.name} #{trait.tokenId}
								</li>
							))}
						</ul>
					</>
				)}
				<h2>Equip: </h2>
				<ul>
					{equipArray.map((trait) => (
						<li key={trait.tokenId}>
							+ &nbsp;{trait.name} #{trait.tokenId}
						</li>
					))}
				</ul>
			</div>
			<div className={styles.footer}>
				<div
					className={styles.saveButton}
					onClick={() => {
						handleClick;
						close();
					}}
				>
					cancel
				</div>
				<div
					className={styles.saveButton}
					onClick={() => {
						handleClick;
						saveChanges();
					}}
				>
					Save
				</div>
			</div>
		</div>
	);
};
