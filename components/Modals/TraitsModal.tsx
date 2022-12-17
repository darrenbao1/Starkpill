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
			<div className={styles.header}>
				<span>select {props.traitName}</span>
				<button
					className={styles.closeButton}
					onClick={() => {
						props.close();
					}}
				>
					<Cross />
				</button>
			</div>
			<div className={styles.selectionContainer2}>
				{props.trait.map((trait, index) => (
					<div key={index}>
						<div
							className={
								index == props.selectedId
									? styles.selectionIconActive
									: styles.selectionIcon
							}
						>
							<Image
								src={trait.link}
								alt={trait.name}
								layout="fill"
								objectFit="contain"
								onClick={() => {
									props.select(trait.id);
								}}
								className={
									props.traitName == "face trait"
										? styles.centreTrait
										: styles.centreTraitBackground
								}
							></Image>
						</div>
						<div className={styles.traitName}>{trait.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};
