import styles from "../../styles/TraitsModal.module.css";
import Cross from "../../public/svgs/cross.svg";
import Image from "next/image";
import { Trait } from "../../types/interfaces";
export const TraitsModal = (props: {
	traitName: string;
	trait: Trait[];
	selectedId: number;
	close: any;
	select: any;
}) => {
	return (
		<div className={styles.modalContainer}>
			<button
				className={styles.closeButton}
				onClick={() => {
					props.close();
				}}
			>
				<Cross />
			</button>
			<div className={styles.header}>select {props.traitName}</div>
			<div className={styles.selectionContainer}>
				{props.trait.map((trait, index) => (
					<div
						className={
							index == props.selectedId - 1
								? styles.selectionIconActive
								: styles.selectionIcon
						}
						key={index}
					>
						<Image
							src={trait.link}
							width={90}
							height={90}
							alt={trait.name}
							onClick={() => {
								props.select(trait.id);
							}}
							className={
								props.traitName == "face trait" ? styles.centreTrait : ""
							}
						></Image>
						<div className={styles.tooltiptext}>{trait.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};
